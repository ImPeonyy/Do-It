import HomePage from "@/components/pages/home-page";
import { getSession } from "@/src/libs/sessions/session.service";

export default async function Home() {
    const session = await getSession();
    return <HomePage isLoggedIn={Boolean(session.accessToken)} />;
}
