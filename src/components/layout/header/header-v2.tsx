'use client';

import { Bell, MessageCircle, PanelLeft } from "lucide-react";
import { Input } from "@/components/ui";

const HeaderV2 = () => {
    return (
        <header className="">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div >
                    <button><PanelLeft /></button>
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 w-200 h-10 rounded-full border px-4">
                    </Input>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-amber-100 border-0 rounded-full w-10 h-10">
                        <MessageCircle className="mx-auto"/>
                        </button>
                    <button className="bg-amber-100 border-0 rounded-full w-10 h-10">
                        <Bell className="mx-auto"/>
                    </button>
                </div>
            </div>
        </header>
    )
};

export default HeaderV2;