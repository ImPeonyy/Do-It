"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Badge, Button, Kbd, KbdGroup } from "@/components/ui";
import { InfoIcon } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/utils/misc.util";
import { LIMIT_TIME_PER_TEST, AVERAGE_TIME_PER_TEST, TOTAL_PART_PER_TEST, TOTAL_QUESTION_PER_PART } from "@/constants/index";
import { usePathname, useRouter } from "next/navigation";

export interface ToeicTestCardProps {
    title: string;
    description: string;
    path: string;
    partsProcess: number | null;
    createdAt: string;
    className?: string;
}

const ToeicTestCard = ({ title, description, path, partsProcess, createdAt, className }: ToeicTestCardProps) => {
    const [testProgress, setTestProgress] = React.useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    
    React.useEffect(() => {
        if (partsProcess === null) {
            setTestProgress(null);
            return;
        }
        if (partsProcess === TOTAL_PART_PER_TEST) {
            setTestProgress("Completed");
            return;
        } else {
            setTestProgress(`${partsProcess} / ${TOTAL_PART_PER_TEST}`);
        }
    }, [partsProcess]);

    return (
        <div
            className={cn(
                "relative flex min-h-70 w-60 flex-col justify-between rounded-3xl bg-white/10 p-5 shadow-md",
                className
            )}
        >
            {testProgress !== null && (
                <div className="absolute top-0 -right-2">
                    <Badge variant={partsProcess === TOTAL_PART_PER_TEST ? "success" : "warning"}>{testProgress}</Badge>
                </div>
            )}
            <div className="flex flex-col gap-2">
                <div className="mt-3 flex flex-col items-start justify-start">
                    <h1>{title}</h1>
                </div>
                <span className="text-sm text-gray-500">{description}</span>
                <div className="flex items-start justify-start">
                    <KbdGroup className="flex-wrap text-sm text-gray-500">
                        <Kbd>Limit: {LIMIT_TIME_PER_TEST} minutes</Kbd>
                        <Kbd>Average: {AVERAGE_TIME_PER_TEST} minutes</Kbd>
                        <Kbd>{TOTAL_PART_PER_TEST} parts</Kbd>
                        <Kbd>{TOTAL_QUESTION_PER_PART.total} questions</Kbd>
                    </KbdGroup>
                </div>
            </div>
            <div className="flex w-full items-center justify-between">
                <span className="text-sm text-gray-500">{formatDateToDDMMYYYY(createdAt)}</span>
                    <Button variant="outline" onClick={() => router.push(`${pathname}/${path}`)}>
                        <InfoIcon /> Detail
                    </Button>
            </div>
        </div>
    );
};

export default ToeicTestCard;
