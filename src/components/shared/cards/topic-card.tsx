"use client";

import * as React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";

export interface TopicCardProps {
    title: string;
    image: string;
    link: string;
    isActive: boolean;
    onClick: () => void;
    className?: string;
}

const TopicCard = ({ title, image, link, isActive, onClick, className }: TopicCardProps) => {
    return (
        <Link
            href={link}
            className={cn(
                "relative flex min-h-45 min-w-60 flex-col items-start justify-between rounded-3xl bg-white/10 p-5 shadow-md backdrop-blur-md",
                className
            )}
        >
            <span
                className="absolute top-4 right-4 cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick();
                }}
            >
                <div
                    className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full",
                        "bg-white/20 backdrop-blur-xl",
                        "border border-white/30",
                        "shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    )}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.1)_65%,rgba(255,255,255,0)_100%)]"></div>
                    <div className="pointer-events-none absolute top-1 left-1 h-2 w-2 rounded-full bg-white/50 opacity-70 blur-[2px]"></div>

                    <Heart
                        size={20}
                        strokeWidth={2}
                        className={cn("text-black", isActive ? "fill-current" : "fill-none")}
                    />
                </div>
            </span>

            <Image src={image} alt={title} width={60} height={45} />

            <div className="flex flex-col items-start justify-start">
                <h1>{title}</h1>
            </div>
        </Link>
    );
};

export default TopicCard;
