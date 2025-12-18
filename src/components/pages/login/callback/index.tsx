"use client";

import * as React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useLogin } from "@/services/index";
import { loginAction } from "@/src/libs/sessions/session.action";
import { PATH } from "@/src/constants/routes.constant";

const CallBackPage = () => {
    const searchParams = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const { mutateAsync: login } = useLogin();

    React.useEffect(() => {
        if (code && state) {
            loginAction(code, state);
            redirect(PATH.DASHBOARD);
        }
    }, [code, state, login]);

    return <div>Loading...</div>;
};

export default CallBackPage;
