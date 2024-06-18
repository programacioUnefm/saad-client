import axios from "axios";


export const saadApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

saadApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token_access")}`,
  }
  return config;
})
