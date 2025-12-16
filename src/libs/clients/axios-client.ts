import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VyTWV6b25JZCI6IjE5MzY2MDE4MDIxMTE3MTczNzYifQ.rYbuGaRwRBr_yByhZm61Xc7kUJurF2MnAxB4A27GcAw";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
