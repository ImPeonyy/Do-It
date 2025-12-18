import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosClient;
