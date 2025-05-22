import { axiosInstanceCities } from "@/utils/api";


export const locationApi = {
    getUFs: async () => {
        const { data } = await axiosInstanceCities.get(`localidades/estados`);

        return data;
    },

    getCitiesByUF: async (UF: number) => {
        const { data } = await axiosInstanceCities.get(`localidades/estados/${UF}/municipios`);

        return data;
    },

}