import axios from "axios";

export const saadApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

saadApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token_access")}`,
  };
  return config;
});

// Interceptor de respuesta
saadApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores
    // TODO: diferenciar los tipos de errores dentro de este interceptor
    const codeError = error.response.status;
    if (codeError == 401) {
      localStorage.removeItem("token_access");
      const appUrl = import.meta.env.VITE_APP_URL;
      window.location.href = `${appUrl}/login`;
    }

    if(codeError == 500){
      console.log("Uno de los módulos no está funcionando de manera correcta");
    }

    return Promise.reject(error);
  }
);
