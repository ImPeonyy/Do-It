"use client";

import { Button } from "@/components/ui";
import { redirectToOauthAction } from "@/src/libs/sessions/session.action";

const LoginPage = () => {
    const handleLogin = () => {
        redirectToOauthAction();
    };

    return (
        <div className="mt-[10%] flex h-screen flex-col items-center">
            <Button
                onClick={handleLogin}
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
