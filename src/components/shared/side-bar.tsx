"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroupLabel,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupContent,
    SidebarSeparator,
    SidebarTrigger,
    SidebarHeader,
    useSidebar,
} from "@/components/ui";
import { Home, Inbox, Calendar, Search, Settings, LogOut, ChevronRight, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/src/libs/sessions/session.action";

const MainItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Communication",
        url: "/communication",
        icon: Inbox,
    },
    {
        title: "Vocabulary Learn",
        url: "/vocabulary/learn",
        icon: Inbox,
    },
    {
        title: "Flash Card",
        url: "/flashcard",
        icon: Calendar,
    },
    {
        title: "Test",
        url: "/test",
        icon: Search,
    },
];

const SubItems = [
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
    {
        title: "Log Out",
        url: "/logout",
        icon: LogOut,
    },
];

const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { open } = useSidebar();

    const handleClick = (url: string) => {
        if (url === "/logout") {
            logoutAction();
        } else {
            router.push(url);
        }
    };

    return (
        <Sidebar className="border-none text-white">
            <SidebarHeader className="relative bg-[#262239] pt-5">
                <SidebarGroupLabel className="flex items-center justify-center text-3xl font-bold text-white">
                    Do It!
                </SidebarGroupLabel>
                <SidebarTrigger
                    className={`absolute rounded-full transition-all duration-450 ${!open ? "bg-foreground text-background top-1/2 -right-5 -translate-y-1/2 pl-3" : "top-0 right-0 text-white"}`}
                    icon={open ? <X className="size-6" /> : <ChevronRight className="size-6" />}
                />
            </SidebarHeader>
            <SidebarContent className="sidebar-bg pt-10">
                <SidebarGroup className="gap-10">
                    <div className="flex flex-col gap-5 pl-10">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {MainItems.map((item) => {
                                    const isActive = pathname.startsWith(item.url);
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={`sidebar-item-hover w-full ${isActive ? "sidebar-item-active" : ""}`}
                                        >
                                            <SidebarMenuButton
                                                className="hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground h-15 w-full cursor-pointer rounded-l-full pl-8 font-bold data-[active=true]:font-bold"
                                                isActive={isActive}
                                                onClick={() => {
                                                    handleClick(item.url);
                                                }}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                        <div className="pr-10">
                            <SidebarSeparator />
                        </div>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {SubItems.map((item) => {
                                    const isActive = pathname.startsWith(item.url);
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={`sidebar-item-hover w-full ${isActive ? "sidebar-item-active" : ""}`}
                                        >
                                            <SidebarMenuButton
                                                className="hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground h-15 w-full cursor-pointer rounded-l-full pl-8 font-bold data-[active=true]:font-bold"
                                                isActive={isActive}
                                                onClick={() => {
                                                    handleClick(item.url);
                                                }}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </div>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SideBar;
