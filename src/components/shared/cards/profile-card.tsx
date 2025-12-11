import * as React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui";
import { Flame } from "lucide-react";

export interface ProfileCardProps {
    image: string;
    name: string;
    email: string;
    points: number;
    streaks: number;
}

const ProfileCard = ({ image, name, email, points, streaks }: ProfileCardProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center gap-3 rounded-4xl bg-amber-200 p-5 pt-10 shadow-2xl">
            <div className="absolute -top-1/2 right-1/2 translate-x-1/2 transform overflow-hidden rounded-full border-4 border-white bg-amber-300">
                <Image src={image} alt="profile" width={100} height={100} />
            </div>
            <div className="flex flex-col items-center justify-center">
                <span>{name}</span>
                <span>{email}</span>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
                <div>{points}</div>
                <Separator orientation="vertical" className="bg-black" />
                <div className="flex items-center justify-center gap-1">
                    <span>{streaks}</span> <Flame size={16} strokeWidth={1.75} />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
