"use client";

import * as React from "react";
import { Answer, useGetPartQuestions, useSubmitAnswers } from "@/services/index";
import { MultipleChoice } from "@/components/shared";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { Separator, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { MainLayout } from "@/components/layout";
import QuestionForm from "@/components/shared/question-form";
import { useScrollSpy } from "@/hooks/index";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import useBeforeUnload from "@/src/hooks/use-before-unload";

interface PracticePageProps {
    testId: string;
    part: string[];
}

const PracticePage = ({ testId, part }: PracticePageProps) => {
    const { data: partQuestions, isLoading } = useGetPartQuestions(testId, part);
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm<FieldValues>({
        defaultValues: {},
        shouldUnregister: false,
    });
    useBeforeUnload(true);

    const questionIds = React.useMemo(
        () => partQuestions?.data.flatMap((p) => p.questions.map((q) => String(q.id))) ?? [],
        [partQuestions]
    );
    const watchedAnswers = useWatch({
        control: form.control,
        name: questionIds,
    });

    const [activePartId, setActivePartId] = React.useState<string>(partQuestions?.data[0].partId.toString() ?? "");
    const [activeQuestionId, setActiveQuestionId] = React.useState<string | undefined>(undefined);
    const { mutate: submitAnswers } = useSubmitAnswers(testId, activePartId, () => {
        toast.success("Submit answers success");
        const newPath = pathname.replace("/practice", "/result");
        router.push(newPath);
    });

    const questionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
    const answeredQuestionIds = React.useMemo(() => {
        const set = new Set<string>();

        watchedAnswers?.forEach((value, index) => {
            if (value !== undefined && value !== null && value !== "") {
                set.add(questionIds[index]);
            }
        });

        return set;
    }, [watchedAnswers, questionIds]);

    const onSubmit = (activePartId: string) => {
        const allData = form.getValues();
        const activePart = partQuestions?.data.find((p) => p.partId.toString() === activePartId);

        if (!activePart) return;

        const partData: Answer[] = [];
        activePart.questions.forEach((question) => {
            const questionId = String(question.id);
            if (allData[questionId] !== undefined && allData[questionId] !== null && allData[questionId] !== "") {
                partData.push({
                    questionId,
                    chosenOption: allData[questionId],
                    passageId: question.passageId ?? null,
                });
            }
        });
        submitAnswers(partData);
    };

    React.useEffect(() => {
        questionIds.forEach((id) => {
            if (!form.getFieldState(id).isTouched && !form.getValues(id)) {
                form.register(id);
            }
        });
    }, [form, questionIds]);

    React.useEffect(() => {
        if (!activePartId && partQuestions?.data.length) {
            setActivePartId(partQuestions.data[0].partId.toString());
            setActiveQuestionId(String(partQuestions.data[0].questions[0]?.id));
        }
        if (activePartId && partQuestions?.data.length) {
            const part = partQuestions.data.find((p) => p.partId.toString() === activePartId);
            if (part?.questions?.length) {
                setActiveQuestionId(String(part.questions[0].id));
            }
        }
    }, [activePartId, partQuestions]);

    const handleNavigateQuestion = React.useCallback(
        (questionId: string | number) => {
            const id = String(questionId);

            const foundPart = partQuestions?.data.find((p) => p.questions.some((q) => String(q.id) === id));

            if (foundPart) {
                const partIdStr = foundPart.partId.toString();
                setActivePartId(partIdStr);
                setActiveQuestionId(id);

                setTimeout(() => {
                    const el = questionRefs.current[id];
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 50);
            }
        },
        [partQuestions]
    );

    const activePartQuestionIds = React.useMemo(() => {
        if (!activePartId) return [];
        const part = partQuestions?.data.find((p) => p.partId.toString() === activePartId);
        return part?.questions.map((q) => String(q.id)) ?? [];
    }, [activePartId, partQuestions]);

    useScrollSpy({
        ids: activePartQuestionIds,
        refs: questionRefs,
        topOffset: 140,
        enabled: !!activePartId,
        onChange: (id) => {
            setActiveQuestionId((prev) => (prev === id ? prev : id));
        },
    });

    if (!partQuestions?.data) return null;

    return (
        <MainLayout
            subContent={
                isLoading ? (
                    <Skeleton className="h-48 w-full" />
                ) : (
                    <QuestionForm
                        parts={partQuestions.data}
                        onSubmit={onSubmit}
                        onQuestionClick={handleNavigateQuestion}
                        answeredQuestionIds={answeredQuestionIds}
                        activeQuestionId={activeQuestionId}
                        activePartId={activePartId}
                        onPartChange={setActivePartId}
                    />
                )
            }
        >
            {isLoading ? (
                <Skeleton className="h-96 w-full" />
            ) : (
                <div className="border-b border-gray-200 p-5">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (activePartId) {
                                onSubmit(activePartId);
                            }
                        }}
                    >
                        <Tabs value={activePartId} onValueChange={(value) => setActivePartId(value)}>
                            <TabsList>
                                {partQuestions.data.map((partQuestion) => (
                                    <TabsTrigger key={partQuestion.partId} value={partQuestion.partId.toString()}>
                                        Part {partQuestion.partNumber}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {partQuestions.data.map((partQuestion) => (
                                <div key={partQuestion.partId}>
                                    <TabsContent value={partQuestion.partId.toString()}>
                                        <div className="mt-5 flex flex-col gap-5">
                                            {partQuestion.questions.map((question, index) => (
                                                <div
                                                    key={question.id}
                                                    ref={(el) => {
                                                        if (el) {
                                                            questionRefs.current[String(question.id)] = el;
                                                        }
                                                    }}
                                                >
                                                    {index > 0 && <Separator className="my-5" />}
                                                    <Controller
                                                        key={question.id}
                                                        name={question.id}
                                                        control={form.control}
                                                        defaultValue={null}
                                                        render={({ field }) => (
                                                            <MultipleChoice
                                                                questionNumber={question.questionNumber}
                                                                question={question.questionText}
                                                                imageUrl={question.imageUrl}
                                                                audioUrl={question.audioUrl}
                                                                options={question.options.map((option) => ({
                                                                    value: option.optionLabel,
                                                                    answer: option.optionText,
                                                                }))}
                                                                value={field.value ?? null}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </div>
                            ))}
                        </Tabs>
                    </form>
                </div>
            )}
        </MainLayout>
    );
};

export default PracticePage;
