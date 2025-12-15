'use client';

import { Bell, MessageCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";

interface HeaderV2Props {
    Trigger: React.ReactNode;
}

const HeaderV2 = ({ Trigger }: HeaderV2Props) => {
    return (
        <header className="grid grid-cols-12">
            <div className="container col-span-9 mx-auto flex h-16 items-center justify-between px-4">
                <div >
                    {Trigger}
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 w-200 h-10 rounded-full border px-4">
                    </Input>
                </div>
                <div className="flex items-center space-x-4">
                    <Button className="bg-amber-100 border-0 rounded-full w-10 h-10">
                        <MessageCircle className="mx-auto"/>
                        </Button>
                    <Button className="bg-amber-100 border-0 rounded-full w-10 h-10">
                        <Bell className="mx-auto"/>
                    </Button>
                </div>
            </div>
        </header>
    )
};

export default HeaderV2;