type ErrorsBrevo = "Invalid phone number" | "Invalid email address";

export const transtaleErrors = (message: ErrorsBrevo) => {
    const options = {
        "Invalid phone number": "Número de telefone em formato inválido",
        "Invalid email address": "Email em formato inválido"
    }

    return options[message] ? options[message] : "Erro ao tentar salvar os dados! Tente novamente mais tarde!"
}