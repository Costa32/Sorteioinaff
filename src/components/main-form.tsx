/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";

import { Controller, useForm } from "react-hook-form";
import { mainFormSchema } from "@/config/form-main-schema";

import { Flex, Input, Button, Text, Box } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { FieldForm } from "@/components/fieldForm";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSweetAlert } from "@/hooks/useAlert";

import { vinculo_options } from "@/utils/vinculos";
import { profissoes_e_cargos_options } from "@/utils/profissoes";


import { locationApi } from "@/services/citiesByUF";

import styles from "../app/page.module.css";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { usersApi } from "@/services/users";
import { estados_brevo } from "@/utils/estados";

interface MainFormProps {
  statesOptions: { label: string; value: string }[];
}

export function MainForm({ statesOptions }: MainFormProps) {
  const [citiesByUFOptions, setCitesByUFOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [repitePhoneNumber, setRepitePhoneNumber] = useState<boolean>(false);

  const { showAlert } = useSweetAlert();


  const router = useRouter();

  const { getCitiesByUF } = locationApi;

  const {
    defaultValues,
    schema,
    labels,
    generalTexts,
    placeholders,
    stylesForm,
  } = mainFormSchema;

  const fieldsArray = Object.keys(labels);

  type FormMainSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormMainSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const tipo_vinculo = watch("vinculo");
  const estado_value = watch("estado");
  const tel_value = watch("telefone");
  const sms_value = watch("sms");
  const whatsapp_value = watch("whatsapp");

  const registerOrUpdateUser = async (data: FormMainSchema) => {
    if (
      !data.nome ||
      !data.sobrenome ||
      !data.cpf ||
      !data.email ||
      !data.sms ||
      !data.estado ||
      !data.municipio ||
      !data.vinculo ||
      !data.profissao ||
      !data.instituicao
    ) {
      showAlert({
        icon: "error",
        title:
          "Algum dos campos obrigatórios não foi preenchido, verifique novamente os dados do formulário!",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const selectedState =
      estados_brevo.find((v) => v.id == Number(data.estado?.value)) ?? null;

    const body = {
      name: data.nome,
      last_name: data.sobrenome,
      cpf: data.cpf,
      email: data.email,
      other_email: data.email2,
      cellphone: data.sms,
      whatsapp: data.whatsapp,
      tel: data.telefone,
      state: !!selectedState ? selectedState?.idBrevo : 0,
      city: data.municipio?.label,
      linked_institution: data.vinculo.value,
      occupation: data.profissao.label,
      institution: data.instituicao,
      job_position: data.cargo,
    };

    const userByEmail = await usersApi.getUsers({ email: data.email }).then((res) => {
      return res.data[0];
    }).catch(() => showAlert({
      icon: "error",
      title:
        "Erro ao tentar verificar usuário!",
      timer: 3000,
      showConfirmButton: false,
    }));

    const userByCpf = await usersApi.getUsers({ cpf: data.cpf }).then((res) => {
      return res.data[0];
    }).catch(() => showAlert({
      icon: "error",
      title:
        "Erro ao tentar verificar usuário!",
      timer: 3000,
      showConfirmButton: false,
    }));

    if (userByEmail?.id || userByCpf?.id) {
      showAlert({
        icon: "error",
        title:
          "Um usuário com esse email ou cpf já foi cadastrado!",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    } else {
      usersApi.postUser(body).then((res) => {

        router.push(`/sucesso/${res.data.data[0]?.id}`)
      }
      ).catch(() => router.push(`/erro`));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerOrUpdateUser)}
      className={styles.brevo}
    >
      <Flex flexDir={["column", "column", "row"]} justify="space-between" align="center">

        <Image
          src="/assets/logo-inaff.png"
          alt="Logo Inaff"
          width={250}
          height={250}
        />


        <Image
          src="/assets/header_sbrafh.png"
          alt="Logo Jaff"
          width={350}
          height={250}
        />

      </Flex>
      <Text
        mt="2rem"
        fontSize={["1.5rem", "2rem"]}
        fontWeight="semibold"
        maxW="100%"
        textAlign="justify"
      >
        {generalTexts.titleForm}
      </Text>

      <Text
        m="1rem 0 2rem"
        fontSize={["1.25rem", "1.5rem"]}
        fontWeight="semibold"
        maxW="100%"
        textAlign="justify"
      >
        {generalTexts.subtitleForm}
      </Text>

      <Flex flexDir="column" gap="0.5rem">
        {fieldsArray?.map((fieldValue) => {
          switch (fieldValue) {
            case "nome":
            case "sobrenome":
            case "cpf":
            case "email":
            case "email2":
            case "instituicao":
            case "cargo":
            case "vinculo2":
              if (fieldValue === "vinculo2" && tipo_vinculo?.value !== "11") {
                return null;
              }

              return (
                <FieldForm
                  key={fieldValue}
                  fieldLabel={labels[fieldValue]}
                  errorMessage={errors[fieldValue]?.message}
                >
                  <Input
                    {...register(`${fieldValue}`)}
                    {...stylesForm.inputStyles}
                    placeholder={placeholders[fieldValue]}
                  />
                </FieldForm>
              );

            case "telefone":
            case "sms":
            case "whatsapp":
              const optionsContact = {
                telefone: tel_value,
                sms: sms_value,
                whatsapp: whatsapp_value,
              };

              return (
                <FieldForm
                  key={fieldValue}
                  fieldLabel={labels[fieldValue]}
                  errorMessage={errors[fieldValue]?.message}
                >
                  <PhoneInput
                    country="br"
                    {...register(`${fieldValue}`)}
                    {...stylesForm.inputStyles}
                    placeholder={placeholders[fieldValue]}
                    value={optionsContact[fieldValue]}
                    onChange={(value) => setValue(`${fieldValue}`, value)}
                  />
                </FieldForm>
              );

            case "switchTel":
              return (
                <FieldForm key={fieldValue} fieldLabel={labels[fieldValue]}>
                  <Switch
                    colorPalette="blue"
                    checked={repitePhoneNumber}
                    onCheckedChange={() => {
                      const values = getValues();

                      if (!repitePhoneNumber) {
                        setValue("telefone", values.sms);
                        setValue("whatsapp", values.sms);
                      } else {
                        setValue("telefone", "");
                        setValue("whatsapp", "");
                      }

                      setRepitePhoneNumber(!repitePhoneNumber);
                    }}
                  />
                </FieldForm>
              );

            case "estado":
              return (
                <FieldForm
                  key={fieldValue}
                  fieldLabel={labels[fieldValue]}
                  errorMessage={errors[fieldValue]?.value?.message}
                >
                  <Controller
                    name={fieldValue}
                    control={control}
                    render={({ field }) => (
                      <Box width="100%">
                        <Select
                          {...field}
                          instanceId={`${fieldValue}-select`}
                          options={statesOptions.toSorted((a, b) =>
                            a.label.localeCompare(b.label)
                          )}
                          placeholder={placeholders[fieldValue]}
                          isClearable
                          onChange={(data) => {
                            setValue(
                              `${fieldValue}`,
                              data ?? defaultValues[fieldValue]
                            );
                            setValue("municipio", defaultValues.municipio);
                            getCitiesByUF(Number(data?.value)).then(
                              (result) => {
                                const citiesOptions = result.map(
                                  (city: any) => ({
                                    label: city.nome,
                                    value: String(city.id),
                                  })
                                );
                                setCitesByUFOptions(citiesOptions);
                              }
                            );
                          }}
                        />
                      </Box>
                    )}
                  />
                </FieldForm>
              );

            case "municipio":
            case "vinculo":
            case "profissao":
              const options =
                fieldValue === "municipio"
                  ? citiesByUFOptions
                  : fieldValue === "vinculo"
                    ? vinculo_options
                    : profissoes_e_cargos_options;

              return (
                <FieldForm
                  key={fieldValue}
                  fieldLabel={labels[fieldValue]}
                  errorMessage={errors[fieldValue]?.value?.message}
                >
                  <Controller
                    name={fieldValue}
                    control={control}
                    render={({ field }) => (
                      <Box width="100%">
                        <Select
                          {...field}
                          instanceId={`${fieldValue}-select`}
                          options={options}
                          placeholder={placeholders[fieldValue]}
                          isClearable
                          isDisabled={
                            fieldValue === "municipio" && !estado_value?.value
                          }
                        />
                      </Box>
                    )}
                  />
                </FieldForm>
              );

            default:
              return <></>;
          }
        })}

        <Text fontWeight="semibold" textAlign="justify">
          {" "}
          {generalTexts.confirmMessage}
        </Text>
        <Flex align="center" justify="center">
          <Button
            mt={2}
            p="0.5rem 1rem"
            type="submit"
            backgroundColor="#517C22"
            color="white"
            alignSelf="center"
            fontSize="1.5rem"
            fontWeight="bold"

          >
            {generalTexts.sendButton}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
