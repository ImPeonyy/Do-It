"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";

export enum EFlashCardMode {
    LEARN = "learn",
    PRACTICE = "practice",
    TEST = "test",
}

export const FLASHCARD_MODE_OPTIONS = [
    {
        label: "Learn Mode",
        icon: "L",
        description: "Learn vocabulary with flashcard, example, pronunciation to remember better.",
        type: EFlashCardMode.LEARN,
    },
    {
        label: "Practice Mode",
        icon: "P",
        description: "Test your knowledge with fill in the blank and flip the card when you answer correctly.",
        type: EFlashCardMode.PRACTICE,
    },
    {
        label: "Test Mode",
        icon: "T",
        description:
            "Complete an entire topic as a test, submit your answers, and receive results and points based on your performance.",
        type: EFlashCardMode.TEST,
    },
];

const FlashCardPage = () => {
    const router = useRouter();

    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-8">
            <span className="mt-5 text-3xl font-bold">Please choose a mode to start</span>
            <div className="grid w-full max-w-5xl gap-8 px-4 md:grid-cols-3">
                {FLASHCARD_MODE_OPTIONS.map((option, index) => (
                    <div
                        key={option.label}
                        className="bg-background flex flex-col items-center justify-between gap-4 rounded-2xl p-8 shadow-lg"
                    >
                        <div
                            className={cn(
                                "flex h-40 w-40 items-center justify-center rounded-full text-4xl font-bold text-white",
                                index === 0
                                    ? "bg-linear-to-tr from-indigo-500 to-sky-400"
                                    : "bg-linear-to-tr from-fuchsia-500 to-purple-500"
                            )}
                        >
                            {option.icon}
                        </div>
                        <div className="mt-2 text-center">
                            <h2 className="text-xl font-semibold">{option.label}</h2>
                            <p className="text-muted-foreground mt-2 text-sm">{option.description}</p>
                        </div>
                        <Button
                            className="mt-4 px-8"
                            size="lg"
                            variant={index % 2 === 0 ? "default" : "secondary"}
                            onClick={() => router.push(`/flashcard/topic?type=${option.type}`)}
                        >
                            Start {option.label}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashCardPage;
