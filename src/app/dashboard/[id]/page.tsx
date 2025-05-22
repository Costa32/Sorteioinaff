/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import { Button, Flex, Text, Spinner, Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSweetAlert } from "@/hooks/useAlert";



import axios from "axios";

export default function Sucesso() {
    const [user, setUser] = useState<any>([]);
    const [sorted_user, set_sorted_user] = useState<any>(null);

    const params = useParams();

    const { showAlert } = useSweetAlert();

    useEffect(() => {
        axios.get(`/api/admin/${params.id}`)
            .then((res) => {

                setUser(res.data); console.log(res.data);
            })
            .catch((err) => console.error(err))

    }, [params.id]);

    const sort_draw_number = () => {
        axios.get(`/api/sorted-number-admin/${params.id}`)
            .then((res) => {

                set_sorted_user(res.data.sorteado);

                showAlert({
                    icon: "sucess",
                    title:
                        "O sorteio saiu!",
                    text: `O número sorteado foi: ${res.data.sorteado?.draw_number} do participante ${res.data.sorteado?.name}`,
                    timer: 3000,
                    showConfirmButton: false,
                    color: "#517C22",
                });
            })
            .catch((err) => console.error(err))
    }

    return (
        <Flex backgroundColor="#517C22" justify='center' align='center' width="100vw" height="100vh">
            <Flex backgroundColor="white" align='center' flexDir='column' padding={["2rem 1rem", "2rem 1rem", "3rem 2rem"]} width="auto" maxW={["100%", "100%", "100%", "80%"]} height="auto" borderRadius={10}>
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
                {!user && <Flex w="100%" align='center' justify="center">
                    <Spinner color="#517C22" />
                </Flex>}
                {!!user &&
                    <Flex w="100%" align='center' flexDir='column'  >
                        <Text textAlign="justify" color="#517C22" fontSize={[24, 24, 40]} fontWeight={800}>Olá, {user.name}!</Text>
                        <Text textAlign={["center", "center", "justify"]} color="#517C22" fontSize={[24, 24, 40]} fontWeight={800}>Aqui você tem acesso aos principais dados sobre os participantes do sorteio e pode realizar o sorteio!</Text>
                        <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]} m="0 2rem">
                            <Box>
                                <Text color="#517C22" fontWeight="bold">Participantes por estado</Text>
                                <ResponsiveContainer width={400} height={200}>
                                    <BarChart data={user?.byState}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="label" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#517C22" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box>
                                <Text color="#517C22" fontWeight="bold">Participantes por ocupação</Text>
                                <ResponsiveContainer width={400} height={200}>
                                    <BarChart data={user?.byOccupation}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="label" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#517C22" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box>
                                <Text color="#517C22" fontWeight="bold">Participantes por vínculo</Text>
                                <ResponsiveContainer width={400} height={200}>
                                    <BarChart data={user?.byLinkedInstitution}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="label" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#517C22" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box>
                                <Text color="#517C22" fontWeight="bold">Participantes por data de criação</Text>
                                <ResponsiveContainer width={400} height={200}>
                                    <BarChart data={user?.byCreatedAt}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="label" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#517C22" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Grid>
                        <Flex mt={8} w="100%" justify="space-between" align="flex-end">
                            <Box>
                                <Text color="#517C22" fontSize={[18, 20, 32]} fontWeight={800}>{sorted_user ? `O resultado saiu!` : "Você pode gerar o número sorteado clicando no botão ao lado"}</Text>
                                {!!sorted_user && <Text color="#517C22" flexWrap="wrap" fontSize={[18, 20, 32]} fontWeight={800}> {`O número sorteado foi:`} </Text>}
                                {!!sorted_user && <Text color="#517C22" flexWrap="wrap" fontSize={[18, 20, 32]} fontWeight={800}> {`${sorted_user?.draw_number} do participante ${sorted_user?.name}`} </Text>}
                            </Box>
                            <Button p="0.25rem 0.5rem" bgColor="#517C22" fontSize={[16, 16, 20]} color="white" fontWeight="bold" onClick={sort_draw_number}>Sortear</Button>
                        </Flex>
                    </Flex>
                }


            </Flex>

        </Flex>
    )
}
