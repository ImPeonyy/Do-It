"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import { PartQuestion } from "@/services/tests/test.interface";

interface QuestionFormProps {
    countDown?: number;
    parts: PartQuestion[];
    onSubmit: () => void;
    onQuestionClick?: (questionId: string | number) => void;
    answeredQuestionIds?: Set<string> | string[];
    activeQuestionId?: string | number;
}

const QuestionForm = ({
    countDown,
    parts,
    onSubmit,
    onQuestionClick,
    answeredQuestionIds,
    activeQuestionId,
}: QuestionFormProps) => {
    const [currentQuestion, setCurrentQuestion] = React.useState<number | null>(1);

    React.useEffect(() => {
        if (activeQuestionId !== undefined && activeQuestionId !== null) {
            setCurrentQuestion(Number(activeQuestionId));
        }
    }, [activeQuestionId]);

    return (
        <aside className="sticky top-10 w-64 space-y-4 rounded-lg border p-4">
            {countDown && (
                <div>
                    <p className="text-sm text-gray-500">Time remaining:</p>
                    <p className="text-xl font-bold">{countDown}</p>
                </div>
            )}

            {parts.map((p) => (
                <div key={p.partId} className="space-y-2">
                    <h3 className="font-semibold">Part {p.partNumber}</h3>

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
                                        !isActive && answered && "border-warning text-warning border-2 font-bold",
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
                </div>
            ))}

            <Button className="w-full" variant="outline" onClick={onSubmit}>
                Submit
            </Button>
        </aside>
    );
};

export default QuestionForm;
