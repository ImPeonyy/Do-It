import { PATH } from "@/src/constants";
import { getSession } from "@/src/libs/sessions/session.service";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (session.accessToken) {
        redirect(PATH.DASHBOARD);
    }

    return (
        <>{children}</>
    );
};

export default AuthLayout;
