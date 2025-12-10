import { cn } from "@/libs/utils";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export interface HorizontalCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    className?: string;
}

const HorizontalCard = ({ title, description, image, link, className }: HorizontalCardProps) => {
    return (
        <Link
            href={link}
            className={cn(
                "flex min-h-24 min-w-60 flex-row items-center justify-start gap-4 rounded-3xl p-4 shadow-md",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl">
                <Image src={image} alt={title} width={64} height={64} />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </Link>
    );
};

export default HorizontalCard;
