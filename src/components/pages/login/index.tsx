"use client";

import { Button } from "@/components/ui";
import { useGetOauthUrl } from "@/services/index";

const LoginPage = () => {
    const { mutateAsync: getOauthUrl, isPending } = useGetOauthUrl();

    const handleLogin = () => {
        getOauthUrl();
    };

    return <Button onClick={handleLogin} disabled={isPending}>Login</Button>;
};

export default LoginPage;
