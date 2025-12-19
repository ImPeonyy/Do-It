"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/src/libs/sessions/session.action";
import { PATH } from "@/src/constants/routes.constant";
import { AiLoading } from "@/components/shared";

const CallBackPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const calledRef = React.useRef(false);

    React.useEffect(() => {
        if (!code || !state) return;
        if (calledRef.current) return;

        calledRef.current = true;
        const handleLogin = async () => {
            await loginAction(code, state);
            router.push(PATH.DASHBOARD);
        };
        handleLogin();
    }, [code, state, router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <AiLoading content="Signing In..." />
        </div>
    );
};

export default CallBackPage;
