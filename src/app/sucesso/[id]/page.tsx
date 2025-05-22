"use client";

import Image from "next/image";
import { Button, Flex, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation'; // Importar useSearchParams

import { usersApi } from "@/services/users";

// Opcional: Definir uma interface para o usuário para melhor tipagem
interface User {
  id: string;
  name: string;
  draw_number: string;
  // Adicione outras propriedades do usuário conforme necessário
}

export default function Sucesso() {
  const [user, setUser] = useState<User | null>(null); // Usando a interface User
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook para acessar os parâmetros da URL

  useEffect(() => {
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const id = String(userId || "");

    if (id) { // Só faz a chamada se o ID existir
      usersApi.getUsers({ id })
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setUser(res.data[0]);
          } else {
            console.warn("Usuário não encontrado.");
            // Opcional: redirecionar ou mostrar uma mensagem de erro
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar usuário:", err);
          // Opcional: redirecionar ou mostrar uma mensagem de erro
        })
        .finally(() => {
          setLoading(false); // Define o carregamento como falso após a requisição
        });
    } else {
      setLoading(false); // Define o carregamento como falso se não houver ID
      console.warn("ID do usuário não fornecido na URL.");
    }
  }, [params.id]);

  // Função para lidar com o compartilhamento no WhatsApp
  const handleShareWhatsApp = () => {
    try {
      // Obtém parâmetros da URL, se existirem
      const nome = searchParams?.get('nome') || user?.name || 'Participante';
      const numeroSorte = searchParams?.get('numero') || user?.draw_number || '000000';

      // Monta a mensagem
      const mensagem = `Olá, ${nome}! Seu número da sorte para o sorteio SBRAFH 2025 é ${numeroSorte}. Guarde esta mensagem como comprovante. Boa sorte!`;

      // Monta a URL de compartilhamento
      const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

      // Abre o WhatsApp
      window.open(url, '_blank');
    } catch (error) {
      console.error("Erro ao compartilhar no WhatsApp:", error);
      alert("Não foi possível compartilhar no WhatsApp.");
    }
  };

  return (
    <Flex backgroundColor="#517C22" justify='center' align='center' width="100vw" height="100vh">
      <Flex backgroundColor="white" align='center' flexDir='column' padding={["2rem 1rem", "2rem 1rem", "3rem 2rem"]} width={800} height="auto" borderRadius={10}>
        <Flex w="100%" justify="space-between" flexDir="row">
          <Image
            src="/assets/logo-inaff.png"
            alt="Logo Inaff"
            width={150}
            height={50}
          />
          <Image
            src="/assets/header_sbrafh.png"
            alt="Logo Jaff"
            width={200}
            height={50}
          />
        </Flex>

        {loading && (
          <Flex w="100%" align='center' justify="center" mt={4}>
            <Spinner color="#517C22" size="xl" />
            <Text ml={2} color="#517C22">Carregando informações do usuário...</Text>
          </Flex>
        )}

        {!loading && !user && (
          <Flex w="100%" align='center' justify="center" mt={4} flexDir="column">
            <Text color="red.500" fontSize="xl" fontWeight="bold">Não foi possível carregar as informações do usuário.</Text>
            <Text mt={2} color="gray.600">Por favor, verifique se o ID está correto na URL.</Text>
            <Button mt={4} p="0.25rem 0.5rem" bgColor="#517C22" fontSize={[16, 16, 18]} color="white" fontWeight="bold" onClick={() => router.push("/")}>Voltar</Button>
          </Flex>
        )}

        {!loading && user && (
          <Flex w="100%" align='center' flexDir='column' >
            <Text textAlign="justify" color="#517C22" fontSize={[24, 24, 40]} fontWeight={800}>Olá, {user.name}!</Text>
            <Text mt={2} textAlign={["center", "center", "left"]} color="#517C22" fontSize={["xl", "2xl", "3xl"]} fontWeight="extrabold">Você foi cadastrado(a) com sucesso!</Text>
            <Text mt={4} textAlign="justify" color="black" fontSize={[16, 16, 24]}>Seu número para o sorteio é:</Text>
            <Text textAlign='center' color="#517C22" fontSize={[24, 24, 50]} fontWeight={800}>{user.draw_number}</Text>
            <Text mt={4} textAlign="justify" color="black" fontSize={[16, 16, 24]}>Por favor, faça um print desta tela como comprovante! ou</Text>
            <button
              onClick={handleShareWhatsApp}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: '#28A745', color: 'white', fontSize: '16px' }} // Estilos inline para consistência com Chakra UI
            >
              Enviar para meu WhatsApp
            </button>
          </Flex>
        )}

        <Flex mt={8} w="100%" justify="space-between" align="flex-end">
          <Text color="#517C22" fontSize={[14, 14, 18]} fontWeight={800}>Data do sorteio: 24/05/2025</Text>
          <Flex mt={8} w="100%" justify="flex-end" align="flex-end">
            <Button p="0.25rem 0.5rem" bgColor="#517C22" fontSize={[16, 16, 18]} color="white" fontWeight="bold" onClick={() => router.push("/")}>Voltar</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
