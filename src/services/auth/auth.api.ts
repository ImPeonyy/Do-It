import axiosClient from "@/libs/clients/axios-client";
import { useMutation } from "@tanstack/react-query";
import authQueryKey from "./auth.qkey";
import { PATH } from "@/src/constants/routes.constant";
import { redirect } from "next/navigation";

const login = async (code: string, state: string) => {
    const response = await axiosClient.post("/oauth/login", { code, state });
    return response.data;
};

const useLogin = () => {
    return useMutation({
        mutationFn: (data: { code: string; state: string }) => login(data.code, data.state),
        mutationKey: authQueryKey.login(),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            redirect(PATH.DASHBOARD);
        },
    });
};

const logout = async () => {
    localStorage.removeItem("access_token");
};

const useLogout = () => {
    return useMutation({
        mutationFn: logout,
        mutationKey: authQueryKey.logout(),
        onSuccess: () => {
            redirect(PATH.AUTH.LOGIN);
        },
    });
};

export { useLogin, useLogout };
