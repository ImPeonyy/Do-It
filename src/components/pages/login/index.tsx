"use client";

import { Button } from "@/components/ui";
import { useGetOauthUrl } from "@/services/index";

const LoginPage = () => {
    const { mutateAsync: getOauthUrl, isPending } = useGetOauthUrl();

    const handleLogin = () => {
        getOauthUrl();
    };

    return (
        <div className="mt-[10%] flex h-screen flex-col items-center">
            <Button
                onClick={handleLogin}
                disabled={isPending}
                variant="outline"
                size="lg"
                className="border-foreground text-xl font-bold"
            >
                Login with Mezon
            </Button>
        </div>
    );
};

export default LoginPage;
