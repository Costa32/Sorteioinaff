import { transtaleErrors } from "@/utils/translateErrors";

test("Verificação de tradução do erro de formatação do telefone", () => {
    expect(transtaleErrors("Invalid phone number")).toBe("Número de telefone em formato inválido");
});

test("Verificação de tradução do erro de formatação do email", () => {
    expect(transtaleErrors("Invalid email address")).toBe("Email em formato inválido");
});

test("Verificação de tradução do erro outro tipo de erro não tratado", () => {
    expect(transtaleErrors("Internal Server Error" as ErrorsBrevo)).toBe("Erro ao tentar salvar os dados! Tente novamente mais tarde!");
})