import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/shared";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Do It!",
    description: "Do It! by Peonyy~",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider defaultOpen={true}>
                    <SideBar /> 
                    <SidebarInset>
                        <SidebarTrigger className="h-20"/>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
