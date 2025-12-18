"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/services/index";

const CallBackPage = () => {
    const searchParams = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const { mutateAsync: login } = useLogin();

    React.useEffect(() => {
        if (code && state) {
            login({ code, state });
        }
    }, [code, state, login]);

    return <div>Loading...</div>;
};

export default CallBackPage;
