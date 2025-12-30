import { redirectToOauthAction } from "@/src/libs/sessions/session.action";
import { AiLoading } from "@/components/shared";

const Page = async () => {
    await redirectToOauthAction();
    return (
        <div className="flex h-screen items-center justify-center">
            <AiLoading content="Redirecting to Mezon..." />;
        </div>
    );
};

export default Page;
