/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button, Flex, Text, Spinner, Box, Grid, Table, Thead, Tbody, Tr, Th, Td, Link, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSweetAlert } from "@/hooks/useAlert";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState<any>([]);
    const [sorted_user, set_sorted_user] = useState<any>(null);
    const [sortedHistory, setSortedHistory] = useState<any[]>([]);
    const [participants, setParticipants] = useState<any[]>([]);
    const [showParticipants, setShowParticipants] = useState(false);

    const params = useParams();
    const { showAlert } = useSweetAlert();

    useEffect(() => {
        axios.get(`/api/admin/${params.id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.error(err));

        // Fetch participants data
        axios.get('/api/users')
            .then((res) => {
                setParticipants(res.data);
            })
            .catch((err) => console.error(err));
    }, [params.id]);

    const sort_draw_number = () => {
        axios.get(`/api/sorted-number-admin/${params.id}`)
            .then((res) => {
                set_sorted_user(res.data.sorteado);
                setSortedHistory([...sortedHistory, res.data.sorteado]);

                showAlert({
                    icon: "success",
                    title: "O sorteio saiu!",
                    text: `O número sorteado foi: ${res.data.sorteado?.draw_number} do participante ${res.data.sorteado?.name}`,
                    timer: 3000,
                    showConfirmButton: false,
                    color: "#517C22",
                });
            })
            .catch((err) => console.error(err));
    };

    return (
        <Box minH="100vh" bg="#f5f5f5">
            <Flex direction="column" maxW="1400px" mx="auto" p={6}>
                {/* Header */}
                <Flex justify="space-between" align="center" mb={8} bg="white" p={4} borderRadius="lg" boxShadow="sm">
                    <Image
                        src="/assets/logo-inaff.png"
                        alt="Logo Inaff"
                        width={150}
                        height={50}
                    />
                    <Link href="https://inaff.org.br" isExternal color="#517C22" fontWeight="bold">
                        Visitar INAFF.org.br
                    </Link>
                    <Image
                        src="/assets/header_sbrafh.png"
                        alt="Logo Jaff"
                        width={200}
                        height={50}
                    />
                </Flex>

                {!user && (
                    <Flex justify="center" align="center" h="300px">
                        <Spinner color="#517C22" size="xl" />
                    </Flex>
                )}

                {user && (
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                        {/* Statistics Cards */}
                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                            <Text color="#517C22" fontWeight="bold" mb={4}>Participantes por Estado</Text>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={user?.byState}>
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#517C22" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                            <Text color="#517C22" fontWeight="bold" mb={4}>Participantes por Ocupação</Text>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={user?.byOccupation}>
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#517C22" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                            <Text color="#517C22" fontWeight="bold" mb={4}>Participantes por Vínculo</Text>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={user?.byLinkedInstitution}>
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#517C22" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                            <Text color="#517C22" fontWeight="bold" mb={4}>Participantes por Data</Text>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={user?.byCreatedAt}>
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#517C22" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Sorteio Section */}
                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" gridColumn="span 2">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Box>
                                    <Text color="#517C22" fontSize="xl" fontWeight="bold">
                                        {sorted_user ? "Último Número Sorteado" : "Realizar Sorteio"}
                                    </Text>
                                    {sorted_user && (
                                        <Text color="#517C22" fontSize="lg">
                                            Número: {sorted_user?.draw_number} - {sorted_user?.name}
                                        </Text>
                                    )}
                                </Box>
                                <Button
                                    colorScheme="green"
                                    bg="#517C22"
                                    onClick={sort_draw_number}
                                >
                                    Sortear
                                </Button>
                            </Flex>

                            {/* Histórico de Sorteios */}
                            {sortedHistory.length > 0 && (
                                <Box mt={4}>
                                    <Text color="#517C22" fontSize="lg" fontWeight="bold" mb={2}>
                                        Histórico de Sorteios
                                    </Text>
                                    <Table variant="simple" size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Número</Th>
                                                <Th>Participante</Th>
                                                <Th>Data/Hora</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {sortedHistory.map((item, index) => (
                                                <Tr key={index}>
                                                    <Td>{item.draw_number}</Td>
                                                    <Td>{item.name}</Td>
                                                    <Td>{new Date().toLocaleString()}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            )}
                        </Box>

                        {/* Participants Section */}
                        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" gridColumn="span 2">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Text color="#517C22" fontSize="xl" fontWeight="bold">
                                    Lista de Participantes
                                </Text>
                                <Button
                                    colorScheme="green"
                                    bg="#517C22"
                                    onClick={() => setShowParticipants(!showParticipants)}
                                >
                                    {showParticipants ? "Ocultar" : "Mostrar"}
                                </Button>
                            </Flex>

                            {showParticipants && (
                                <Box overflowX="auto">
                                    <Table variant="simple" size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Nome</Th>
                                                <Th>Email</Th>
                                                <Th>Telefone</Th>
                                                <Th>Estado</Th>
                                                <Th>Instituição</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {participants.map((participant) => (
                                                <Tr key={participant.id}>
                                                    <Td>{`${participant.name} ${participant.last_name}`}</Td>
                                                    <Td>{participant.email}</Td>
                                                    <Td>{participant.cellphone}</Td>
                                                    <Td>{participant.state}</Td>
                                                    <Td>{participant.institution}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                )}

                {/* Social Media Footer */}
                <Flex justify="center" gap={6} mt={8} p={4} bg="white" borderRadius="lg" boxShadow="sm">
                    <Link href="https://facebook.com/inaff" isExternal>
                        <Icon as={FaFacebook} boxSize={6} color="#517C22" />
                    </Link>
                    <Link href="https://twitter.com/inaff" isExternal>
                        <Icon as={FaTwitter} boxSize={6} color="#517C22" />
                    </Link>
                    <Link href="https://instagram.com/inaff" isExternal>
                        <Icon as={FaInstagram} boxSize={6} color="#517C22" />
                    </Link>
                    <Link href="https://linkedin.com/company/inaff" isExternal>
                        <Icon as={FaLinkedin} boxSize={6} color="#517C22" />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
}