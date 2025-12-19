import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api/internal",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
