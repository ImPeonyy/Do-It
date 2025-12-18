import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockProvider, QueryProvider } from "@/libs/providers";
import { Toaster } from "@/components/ui";

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
                            {children}
                        </MockProvider>
                    </QueryProvider>
                <Toaster />
            </body>
        </html>
    );
}
