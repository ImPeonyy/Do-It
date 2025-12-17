import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui";
import { HeaderV2 } from "@/components/layout";
import { SideBar } from "@/components/shared";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar />
            <SidebarInset>
                <HeaderV2 Trigger={<SidebarTrigger />} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AppLayout;
