import { SidebarInset, SidebarProvider } from "@/components/ui";
import { HeaderV2 } from "@/components/layout";
import { SideBar } from "@/components/shared";
import { getSession } from "@/src/libs/sessions/session.service";
import { redirect } from "next/navigation";
import { FeedbackButton } from "@/components/shared/index";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (!session.accessToken) {
        redirect("/");
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar />
            <SidebarInset>
                <HeaderV2 />
                {children}
                <FeedbackButton />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AppLayout;
