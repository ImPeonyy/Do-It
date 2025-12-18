import axios from "axios";
import { cookies } from "next/headers";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
