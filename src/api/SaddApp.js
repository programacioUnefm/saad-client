import axios from "axios";

const token = localStorage.getItem("token_access");

export const saadApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});
