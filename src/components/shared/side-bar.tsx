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
} from "@/components/ui/sidebar";
import { Home, Inbox, Calendar, Search, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const MainItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Vocabulary Learn",
        url: "/vocabulary/learn",
        icon: Inbox,
    },
    {
        title: "Vocabulary Test",
        url: "/vocabulary/test",
        icon: Calendar,
    },
    {
        title: "Schedule",
        url: "/schedule",
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

    return (
        <Sidebar className="border-none text-foreground">
            <SidebarContent className="sidebar-bg">
                <SidebarGroup className="gap-10">
                    <SidebarGroupLabel className="flex justify-center font-bold text-white text-3xl items-center">Do It!</SidebarGroupLabel>
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
                                                asChild
                                                className="h-15 w-full rounded-l-full pl-8 font-bold hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground"
                                                isActive={isActive}
                                            >
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
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
                                            asChild
                                            className="h-15 w-full rounded-l-full pl-8 font-bold hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground"
                                            isActive={isActive}
                                        >
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
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
