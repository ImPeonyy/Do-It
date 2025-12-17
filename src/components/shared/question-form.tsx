"use client";

import * as React from "react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { PartQuestion } from "@/services/tests/test.interface";

interface QuestionFormProps {
    countDown?: number;
    parts: PartQuestion[];
    onSubmit: (activePartId: string) => void;
    onQuestionClick?: (questionId: string | number) => void;
    answeredQuestionIds?: Set<string> | string[];
    activeQuestionId?: string | number;
    activePartId?: string;
    onPartChange?: (partId: string) => void;
}

const QuestionForm = ({
    countDown,
    parts,
    onSubmit,
    onQuestionClick,
    answeredQuestionIds,
    activeQuestionId,
    activePartId: controlledActivePartId,
    onPartChange,
}: QuestionFormProps) => {
    const [currentQuestion, setCurrentQuestion] = React.useState<number | null>(1);
    const [internalActivePartId, setInternalActivePartId] = React.useState<string>(
        parts[0]?.partId.toString() ?? ""
    );

    const activePartId = controlledActivePartId ?? internalActivePartId;

    React.useEffect(() => {
        if (activeQuestionId !== undefined && activeQuestionId !== null) {
            setCurrentQuestion(Number(activeQuestionId));
        }
    }, [activeQuestionId]);

    const handlePartChange = (value: string) => {
        if (onPartChange) {
            onPartChange(value);
        } else {
            setInternalActivePartId(value);
        }
    };

    return (
        <aside className="sticky top-10 w-64 space-y-4 rounded-lg border p-4">
            {countDown && (
                <div>
                    <p className="text-sm text-gray-500">Time remaining:</p>
                    <p className="text-xl font-bold">{countDown}</p>
                </div>
            )}
            <Tabs value={activePartId} onValueChange={handlePartChange}>
                <TabsList>
                    {parts.map((p) => (
                        <TabsTrigger key={p.partId} value={p.partId.toString()}>
                            Part {p.partNumber}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {parts.map((p) => (
                    <div key={p.partId} className="mt-3 space-y-2">
                        <TabsContent value={p.partId.toString()}>
                            <div className="grid grid-cols-5 gap-2">
                                {p.questions.map((q) => {
                                    const questionId = Number(q.id);
                                    const isActive = currentQuestion === questionId;
                                    const answered =
                                        (answeredQuestionIds as Set<string> | undefined)?.has?.(String(q.id)) ||
                                        (answeredQuestionIds as string[] | undefined)?.includes?.(String(q.id));

                                    return (
                                        <Button
                                            key={q.id}
                                            onClick={() => {
                                                setCurrentQuestion(questionId);
                                                onQuestionClick?.(q.id);
                                            }}
                                            variant="outline"
                                            className={[
                                                "h-10 w-10 rounded border text-sm font-medium",
                                                isActive && "bg-blue-600 text-white",
                                                !isActive &&
                                                    answered &&
                                                    "border-warning text-warning border-2 font-bold",
                                                isActive && answered && "bg-warning border-warning text-white",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
                                            {q.questionNumber}
                                        </Button>
                                    );
                                })}
                            </div>
                        </TabsContent>
                    </div>
                ))}
                <Button className="mt-5 w-full" variant="outline" onClick={() => onSubmit(activePartId)}>
                    Submit
                </Button>
            </Tabs>
        </aside>
    );
};

export default QuestionForm;
