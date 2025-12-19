"use client";

import { RadioGroup, RadioGroupItem, Separator } from "@/components/ui";
import { cn } from "@/libs/utils";

export interface TrueFalseSelectionProps {
    id: string;
    value?: string;
    onChange?: (val: string) => void;
    className?: string;
}

const TrueFalseSelection = ({ id, value, onChange, className }: TrueFalseSelectionProps) => {
    const trueId = `${id}-true`;
    const falseId = `${id}-false`;
    return (
        <RadioGroup
            id={id}
            name={id}
            value={value}
            onValueChange={onChange}
            className={cn("relative flex w-36 h-12 select-none", className)}
        >
            <div className="relative flex w-full h-full rounded-xl overflow-hidden border bg-card text-card-foreground cursor-pointer">
                <label
                    htmlFor={trueId}
                    className={`flex-1 flex items-center justify-center transition-all duration-300
                        ${value === "true" ? "bg-green-500 text-white scale-105" : "hover:bg-green-100"}
                    `}
                >
                    <RadioGroupItem id={trueId} value="true" className="hidden" />
                    <span className="font-medium">True</span>
                </label>

                <Separator orientation="vertical" />

                <label
                    htmlFor={falseId}
                    className={`flex-1 flex items-center justify-center transition-all duration-300
                        ${value === "false" ? "bg-red-500 text-white scale-105" : "hover:bg-red-100"}
                    `}
                >
                    <RadioGroupItem id={falseId} value="false" className="hidden" />
                    <span className="font-medium">False</span>
                </label>
            </div>
        </RadioGroup>
    );
};

export default TrueFalseSelection;
