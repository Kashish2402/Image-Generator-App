import axios from "axios";

const BASE_URL = "https://imagen-1y5p.onrender.com/api/v1"; 

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});