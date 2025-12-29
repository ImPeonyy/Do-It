"use client";

import { useEffect } from "react";

const useBeforeUnload = (enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return;

        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [enabled]);
};

export default useBeforeUnload;
