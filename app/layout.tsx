import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/shared";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui";
import { HeaderV2 } from "@/components/layout";
import { MockProvider, QueryProvider } from "@/libs/providers";

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
                <QueryProvider>
                    <MockProvider>
                        <SidebarProvider defaultOpen={true}>
                            <SideBar />
                            <SidebarInset>
                                <HeaderV2 Trigger={<SidebarTrigger />} />
                                {children}
                            </SidebarInset>
                        </SidebarProvider>
                    </MockProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
