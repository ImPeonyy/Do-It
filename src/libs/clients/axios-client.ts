import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

export default axiosClient;
