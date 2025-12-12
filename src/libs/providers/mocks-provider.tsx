"use client";

import { useEffect, useState } from "react";

export default function MockProvider({ children }: { children: React.ReactNode }) {
    const isDevelopment = process.env.NODE_ENV === "development";
    const [isReady, setIsReady] = useState(!isDevelopment);

    useEffect(() => {
        if (typeof window === "undefined") {
            setIsReady(true);
            return;
        }

        if (isDevelopment) {
            import("../../mocks/browser")
                .then(({ worker }) => {
                    return worker.start({
                        onUnhandledRequest: (request, print) => {
                            if (
                                request.url.includes("/_next/") ||
                                request.url.includes("webpack-hmr") ||
                                request.url.includes("/__nextjs_original-stack-frames") ||
                                request.url.startsWith("ws://") ||
                                request.url.startsWith("wss://")
                            ) {
                                return;
                            }
                            print.warning();
                        },
                    });
                })
                .then(() => {
                    setIsReady(true);
                })
                .catch((error) => {
                    console.error("Failed to start MSW worker:", error);
                    setIsReady(true);
                });
        } else {
            setIsReady(true);
        }
    }, [isDevelopment]);

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
}
