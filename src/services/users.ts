/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const usersApi = {
    getUsers: async (query: { email?: string; id?: string, cpf?: string }) => {
        return axios.get('/api/users', { params: query })
            .then((res) => res)
            .catch((err) => err)
    },

    postUser: async (body: any) => {
        return axios.post('/api/users', body)
            .then((res) => res)
            .catch((err) => err)
    },
}