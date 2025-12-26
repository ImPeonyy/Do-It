"use client";

import { Bell, ChevronsLeft, MessageCircle, RotateCw } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";

const HeaderV2 = () => {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    const canGoBack = segments.length > 1;

    const handleBack = () => {
        if (!canGoBack) return;

        segments.pop();
        const parentPath = "/" + segments.join("/");

        router.push(parentPath);
    };

    const handleRefresh = () => {
        router.refresh();
    };
    return (
        <header className="grid grid-cols-12">
            <div className="col-span-9 flex h-16 items-center justify-between px-5">
                <div className="flex items-center gap-5">
                    <span
                        className={`${canGoBack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                        onClick={handleBack}
                    >
                        <ChevronsLeft className="h-8 w-8" />
                    </span>
                    <span className="cursor-pointer" onClick={handleRefresh}>
                        <RotateCw className="h-6 w-6" />
                    </span>
                </div>
                <div className="flex w-full max-w-2/3 items-center">
                    <Input type="text" placeholder="Search..." className="h-10 flex-1 rounded-full border px-4"></Input>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="h-10 w-10 rounded-full" variant="outline">
                        <MessageCircle className="mx-auto" />
                    </Button>
                    <Button className="h-10 w-10 rounded-full" variant="outline">
                        <Bell className="mx-auto" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default HeaderV2;
