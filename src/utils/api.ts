"use client";

import Axios from "axios";

const axiosInstanceCities = Axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


export { axiosInstanceCities };
