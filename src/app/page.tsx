/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

import { Flex, Spinner } from "@chakra-ui/react";

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
        </Flex>
      </main>
    </div>
  );
}
