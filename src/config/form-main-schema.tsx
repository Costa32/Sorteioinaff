import { z } from "zod";
import { validateCPF } from 'validations-br';

export const mainFormSchema = {
  defaultValues: {
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    telefone: "",
    sms: "",
    whatsapp: "",
    municipio: {
      label: "",
      value: "",
    },
    estado: {
      label: "",
      value: "",
    },
    profissao: {
      label: "",
      value: "",
    },
    instituicao: "",
    cargo: "",
    vinculo: {
      label: "",
      value: "",
    },
    email2: "",
  },
  schema: z.object({
    nome: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(1, "O nome é obrigatório."),
    sobrenome: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(1, "O sobrenome é obrigatório."),
    cpf: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(11, 'O CPF deve ter pelo menos 11 dígitos')
      .max(14, 'O CPF deve ter no máximo 14 caracteres')
      .refine((cpf) => validateCPF(cpf), {
        message: 'CPF inválido',
      }),
    email: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(1, "O email é obrigatório."),
    telefone: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .optional(),
    sms: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(1, "O telefone é obrigatório."),
    whatsapp: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .optional(),
    municipio: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => !!data.value, {
        message: "O município é obrigatório!",
        path: ["value"],
      })
      .nullable(),
    estado: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => !!data.value, {
        message: "O estado é obrigatório!",
        path: ["value"],
      })
      .nullable(),
    profissao: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => !!data.value, {
        message: "A profissão é obrigatória!",
        path: ["value"],
      })
      .nullable(),
    instituicao: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .min(1, "A instituição é obrigatória."),
    cargo: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .optional(),
    vinculo: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => !!data.value, {
        message: "O tipo de vínculo é obrigatório!",
        path: ["value"],
      })
      .nullable(),
    vinculo2: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .optional(),
    email2: z
      .string({
        invalid_type_error: "Campo inválido!",
      })
      .optional(),
  }),
  labels: {
    nome: "Nome: *",
    sobrenome: "Sobrenome:",
    cpf: "CPF: *",
    email: "Email: *",
    email2: "Outro email: (opcional)",
    sms: "Telefone celular: * (formato: código do país + ddd + telefone)",
    switchTel: "Deseja repetir o telefone para whatsapp e sms?",
    whatsapp: "Whatsapp: (opcional)",
    telefone: "Telefone: (opcional)",
    estado: "Estado: *",
    municipio: "Municipio: *",
    vinculo: "Tipo de vínculo: *",
    vinculo2: "Qual outro tipo de vínculo? (opcional)",
    profissao: "Profissão: *",
    instituicao: "Instituição: *",
    cargo: "Cargo: (opcional)",
  },
  generalTexts: {
    titleForm:
      "PARTICIPE!",
    subtitleForm:
      "CADASTRE-SE E CONCORRA A PRÊMIOS.",
    confirmMessage:
      "Ao enviar este formulário, você concorda com a coleta, armazenamento e o uso de seus dados pelo INAFF.",
    sendButton: "ENVIAR",
  },
  placeholders: {
    nome: "Digite o nome",
    sobrenome: "Digite o sobrenome",
    cpf: "000.000.000-00",
    email: "email@email.com",
    telefone: "+55 (77) 999999999",
    sms: "+55 (77) 999999999",
    whatsapp: "+55 (77) 999999999",
    municipio: "Escolha o municipio",
    estado: "Escolha o estado",
    profissao: "Escolha o profissão",
    instituicao: "Digite a instituição",
    cargo: "Digite o cargo",
    vinculo: "Escolha o tipo de vínculo",
    vinculo2: "Digite o outro tipo de vínculo",
    email2: "outroemail@email.com",
  },
  stylesForm: {
    inputStyles: {
      p: "0.25rem 0.5rem",
      fontSize: "1rem",
    },
    labelsStyles: {
      fontSize: "1.125rem",
    },
  },
};
