"use client";

import Image from "next/image";

import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";


export default function Sucesso() {
    const router = useRouter();

    return (
        <Flex backgroundColor="#911" justify='center' align='center' width="100vw" height="100vh">
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
                <Text mt={8} textAlign="justify" color="#911" fontSize={[24, 24, 40]} fontWeight={800}>Erro ao finalizar seu cadastro!</Text>
                <Text textAlign={["center", "center", "justify"]} color="black" fontSize={[16, 16, 24]}>Por favor retorne para o formulário e tente novamente.</Text>
                <Flex mt={8} w="100%" justify="flex-end" align="flex-end">

                    <Button p="0.25rem 0.5rem" bgColor="#911" fontSize={[16, 16, 18]} color="white" fontWeight="bold" onClick={() => router.push("/")}>Voltar</Button>
                </Flex>

            </Flex>

        </Flex>
    )
}