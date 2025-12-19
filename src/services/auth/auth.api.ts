import axiosClient from "@/libs/clients/axios-client";
import { useMutation } from "@tanstack/react-query";
import authQueryKey from "./auth.qkey";
import { PATH } from "@/src/constants/routes.constant";
import { redirect } from "next/navigation";

const getOauthUrl = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/redirect-oauth`);
    return response.json();
};

const useGetOauthUrl = () => {
    return useMutation({
        mutationFn: getOauthUrl,
        mutationKey: authQueryKey.getOauthUrl(),
        onSuccess: (data) => {
            window.location.href = data.url;
        },
    });
};

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

export { useLogin, useGetOauthUrl, useLogout };
