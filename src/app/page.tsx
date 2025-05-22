/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

import { Flex, Spinner, Link, Icon, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

import { locationApi } from "@/services/citiesByUF";

import { MainForm } from "@/components/main-form";

import styles from "./page.module.css";

export default function Home() {
  const [statesOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);

  const { getUFs } = locationApi;

  useEffect(() => {
    setLoadingInfo(true);
    getUFs()
      .then((response) => {
        const ufsOptions = response.map((uf: any) => ({
          label: uf.sigla ?? "",
          value: String(uf.id),
        }));
        setStateOptions(ufsOptions);
      })
      .finally(() => setLoadingInfo(false));
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Flex
          bgColor="white"
          color="black"
          flexDir="column"
          justify="center"
          align="center"
          p={["1.5rem", "1.5rem 2rem"]}
          borderRadius="2rem"
        >
          {!!loadingInfo && <Spinner />}
          {!loadingInfo && <MainForm statesOptions={statesOptions} />}

          {/* Footer with social media links */}
          <Flex 
            direction="column" 
            align="center" 
            mt={8} 
            pt={4} 
            borderTop="1px solid #eaeaea"
            w="100%"
          >
            <Link 
              href="https://inaff.org.br" 
              isExternal 
              color="#517C22" 
              fontWeight="bold" 
              mb={4}
            >
              Visite inaff.org.br
            </Link>
            
            <Text mb={2} color="#517C22">Siga-nos nas redes sociais:</Text>
            <Flex gap={6}>
              <Link href="https://facebook.com/inaff" isExternal>
                <Icon as={FaFacebook} boxSize={6} color="#517C22" />
              </Link>
              <Link href="https://instagram.com/inaff" isExternal>
                <Icon as={FaInstagram} boxSize={6} color="#517C22" />
              </Link>
              <Link href="https://linkedin.com/company/inaff" isExternal>
                <Icon as={FaLinkedin} boxSize={6} color="#517C22" />
              </Link>
              <Link href="https://wa.me/seunumero" isExternal>
                <Icon as={FaWhatsapp} boxSize={6} color="#517C22" />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}