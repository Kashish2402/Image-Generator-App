import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://imagen-1y5p.onrender.com/api/v1"; 

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});