"use client";

import * as React from "react";

type RefMap = Record<string, HTMLElement | null>;

interface UseScrollSpyOptions {
    ids: string[];
    refs: React.MutableRefObject<RefMap>;
    topOffset?: number;
    activationDistance?: number;
    enabled?: boolean;
    onChange?: (id: string) => void;
}

export default function useScrollSpy({
    ids,
    refs,
    topOffset = 120,
    activationDistance = 200,
    enabled = true,
    onChange,
}: UseScrollSpyOptions) {
    React.useEffect(() => {
        if (!enabled || ids.length === 0) return;

        let ticking = false;

        const updateActive = () => {
            let bestId: string | undefined;
            let bestDistance = Number.POSITIVE_INFINITY;
            let closestAboveId: string | undefined;
            let closestAboveTop = -Number.POSITIVE_INFINITY;

            ids.forEach((id) => {
                const el = refs.current[id];
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const adjustedTop = rect.top - topOffset;

                if (adjustedTop >= 0) {
                    if (adjustedTop <= activationDistance && adjustedTop < bestDistance) {
                        bestDistance = adjustedTop;
                        bestId = id;
                    }
                } else if (rect.top > closestAboveTop) {
                    closestAboveTop = rect.top;
                    closestAboveId = id;
                }
            });

            const nextId = bestId ?? closestAboveId;
            if (nextId) {
                onChange?.(nextId);
            }
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateActive();
                ticking = false;
            });
        };

        updateActive();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [enabled, ids, onChange, refs, topOffset, activationDistance]);
}
