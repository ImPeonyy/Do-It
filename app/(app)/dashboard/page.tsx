import DashboardPage from "@/components/pages/dashboard";
import { getSession } from "@/src/libs/sessions/session.service";

const Page = async () => {
    const session = await getSession();
    console.log("session", session);
    return <DashboardPage />;
};

export default Page;
