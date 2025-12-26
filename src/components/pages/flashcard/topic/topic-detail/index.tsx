"use client";

import * as React from "react";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout";
import {
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    FlashCard,
    Input,
    type CarouselApi,
    EFlashCardEffect,
} from "@/components/ui";
import {
    TopicTestResultResponse,
    useGetUserStreak,
    useGetVocabulariesTopic,
    useSubmitTestAnswers,
    useUpdateUserStreak,
    VocabsTestAnswer,
    Vocabulary,
} from "@/src/services";
import { AiLoading, PageTitle } from "@/components/shared";
import { EFlashCardMode, FLASHCARD_MODE_OPTIONS } from "../../index";
import { HeartIcon, Volume2 } from "lucide-react";
import { normalizeString } from "@/src/utils";
import { playTTS } from "@/src/utils";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import useBeforeUnload from "@/src/hooks/use-before-unload";
interface TopicDetailPageProps {
    topicId: string;
    mode: EFlashCardMode;
}

const TopicDetailPage = ({ topicId, mode }: TopicDetailPageProps) => {
    const router = useRouter();
    const topicIdNumber = parseInt(topicId, 10);
    const queryClient = useQueryClient();
    const { data: topicDetailData, isLoading: isLoadingVocabularies } = useGetVocabulariesTopic(topicIdNumber, mode);
    const { mutate: submitTestAnswersMutation } = useSubmitTestAnswers((data: TopicTestResultResponse) => {
        queryClient.setQueryData(["topic-test-result", topicId], data);
        router.push(`/flashcard/topic/${topicId}/result`);
    });
    const { data: userStreakData, refetch: refetchUserStreak } = useGetUserStreak();
    const { mutate: updateUserStreakMutation } = useUpdateUserStreak(() => {
        refetchUserStreak();
    });

    const currentTopic = topicDetailData?.data;
    const vocabularies = React.useMemo(() => topicDetailData?.data?.vocabs || [], [topicDetailData?.data?.vocabs]);

    const isPracticeMode = mode === EFlashCardMode.PRACTICE;
    const isTestMode = mode === EFlashCardMode.TEST;

    useBeforeUnload(isTestMode);
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [inputValues, setInputValues] = React.useState<Record<number, string>>({});
    const [correctAnswers, setCorrectAnswers] = React.useState<Set<number>>(new Set());
    const [flippedCards, setFlippedCards] = React.useState<Set<number>>(new Set());

    const defaultAnswers = React.useMemo(() => {
        return vocabularies.reduce((acc: Record<string, string>, vocab: Vocabulary) => {
            acc[String(vocab.id)] = "";
            return acc;
        }, {});
    }, [vocabularies]);

    const testAnswersSchema = React.useMemo(() => {
        const answersSchema = vocabularies.reduce(
            (acc, vocab) => {
                acc[String(vocab.id)] = z
                    .string()
                    .min(1, { message: "Please enter the meaning of this word" })
                    .refine((val) => val.trim().length > 0, {
                        message: "Please enter the meaning of this word",
                    });
                return acc;
            },
            {} as Record<string, z.ZodString>
        );

        return z.object({
            answers: z.object(answersSchema),
        });
    }, [vocabularies]);

    type TestAnswersForm = z.infer<typeof testAnswersSchema>;

    const form = useForm<TestAnswersForm>({
        resolver: zodResolver(testAnswersSchema),
        defaultValues: {
            answers: defaultAnswers as Record<string, string>,
        },
        mode: "onChange",
    });

    const submitTestAnswers = (data: TestAnswersForm) => {
        const answers: VocabsTestAnswer[] = [];
        Object.entries(data.answers).forEach(([key, value]) => {
            if (value && value.trim().length > 0) {
                answers.push({
                    questionId: parseInt(key, 10),
                    answer: value.trim(),
                });
            }
        });
        submitTestAnswersMutation({ topicId: topicIdNumber, answers });
    };

    React.useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    React.useEffect(() => {
        if (vocabularies.length > 0) {
            const defaultAnswers = vocabularies.reduce((acc: Record<string, string>, vocab: Vocabulary) => {
                acc[String(vocab.id)] = "";
                return acc;
            }, {});
            form.reset({
                answers: defaultAnswers,
            });
        }
    }, [vocabularies, form]);

    const checkAnswer = (userInput: string, correctAnswers: string[]) => {
        const normalizedInput = normalizeString(userInput);
        const isCorrect = correctAnswers.includes(normalizedInput);
        return isCorrect;
    };

    const currentVocab = vocabularies[current];
    const currentCorrectAnswers = currentVocab ? (currentVocab?.meaning?.split(", ") ?? []) : [];
    const currentInputValue = currentVocab ? inputValues[currentVocab.id] || "" : "";
    const currentIsCorrect = currentVocab ? correctAnswers.has(currentVocab.id) : false;
    const currentIsFlipped = currentVocab ? flippedCards.has(currentVocab.id) : false;

    const handleInputChange = (value: string) => {
        if (!currentVocab) return;

        setInputValues((prev) => ({ ...prev, [currentVocab.id]: value }));
    };

    const handleSubmit = () => {
        if (!currentVocab) return;

        const userInput = inputValues[currentVocab.id] || "";

        if (checkAnswer(userInput, currentCorrectAnswers)) {
            if (!userStreakData?.data?.todayStreak) {
                updateUserStreakMutation();
            }
            setCorrectAnswers((prev) => new Set([...prev, currentVocab.id]));
            setFlippedCards((prev) => new Set([...prev, currentVocab.id]));
        }
    };

    const handlePlayAudio = async (text: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        try {
            await playTTS(text, { lang: "en-US", speed: 1 });
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    if (isLoadingVocabularies) {
        return (
            <MainLayout>
                <div className="flex min-h-[400px] items-center justify-center">
                    <AiLoading />
                </div>
            </MainLayout>
        );
    }

    if (vocabularies.length === 0) {
        return (
            <MainLayout>
                <div className="flex flex-col gap-8">
                    <PageTitle title={currentTopic?.name || "Topic Detail"} />
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-muted-foreground text-lg">No vocabularies found in this topic</div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!Object.values(EFlashCardMode).includes(mode)) {
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
                                onClick={() => router.push(`/flashcard/topic/${topicId}?mode=${option.mode}`)}
                            >
                                Start {option.label}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isTestMode) {
        return (
            <MainLayout>
                <div className="flex flex-col gap-8">
                    <PageTitle title={currentTopic?.name || "Topic Detail"} />
                    <div className="mx-auto w-full max-w-2xl">
                        <form onSubmit={form.handleSubmit(submitTestAnswers)}>
                            <Carousel className="w-full" setApi={setApi}>
                                <CarouselPrevious type="button" />
                                <CarouselContent className="w-full">
                                    {vocabularies.map((vocab: Vocabulary) => {
                                        const vocabIsCorrect = correctAnswers.has(vocab.id);
                                        const vocabIsFlipped = flippedCards.has(vocab.id);

                                        return (
                                            <CarouselItem key={vocab.id}>
                                                <div className="flex justify-center px-5 py-15">
                                                    <FlashCard
                                                        frontContent={
                                                            <div className="flex w-full flex-col items-center justify-center gap-2">
                                                                <div className="text-3xl font-bold">{vocab.word}</div>
                                                                {vocab.pronounce && (
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        <div className="text-muted-foreground text-lg">
                                                                            /{vocab.pronounce}/
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-8 w-8 p-0"
                                                                            onClick={(e) =>
                                                                                handlePlayAudio(vocab.word, e)
                                                                            }
                                                                            title="Play audio"
                                                                        >
                                                                            <Volume2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                                {vocab.partOfSpeech && (
                                                                    <div className="text-muted-foreground text-sm italic">
                                                                        {vocab.partOfSpeech}
                                                                    </div>
                                                                )}

                                                                <div className="text-muted-foreground w-full max-w-2/3 text-sm italic">
                                                                    <Controller
                                                                        control={form.control}
                                                                        name={`answers.${vocab.id}`}
                                                                        defaultValue=""
                                                                        render={({ field, fieldState }) => (
                                                                            <div className="w-full">
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="Enter the meaning of the word..."
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                    onBlur={field.onBlur}
                                                                                    name={field.name}
                                                                                    autoComplete="off"
                                                                                    onKeyDown={(e) => {
                                                                                        e.stopPropagation();
                                                                                    }}
                                                                                    className={
                                                                                        fieldState.error
                                                                                            ? "border-destructive"
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                                {fieldState.error && (
                                                                                    <p className="text-destructive mt-1 text-xs">
                                                                                        {fieldState.error.message}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        width="w-full"
                                                        height="h-64"
                                                        disabled={true}
                                                        initialFlipped={vocabIsFlipped}
                                                        effect={
                                                            vocabIsCorrect
                                                                ? EFlashCardEffect.CORRECT
                                                                : EFlashCardEffect.NONE
                                                        }
                                                    />
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>
                                <CarouselNext type="button" />
                            </Carousel>
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <div className="bg-muted relative h-2 w-1/2 overflow-hidden rounded-full">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((current + 1) / vocabularies.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                    <HeartIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <Button type="submit" size="lg">
                                    Submit Answers
                                </Button>
                                {Object.keys(form.formState.errors.answers || {}).length > 0 && (
                                    <p className="text-destructive text-sm">Please fill in all the answers</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-col gap-8">
                <PageTitle title={currentTopic?.name || "Topic Detail"} />
                <div className="mx-auto w-full max-w-2xl">
                    <Carousel className="w-full" setApi={setApi}>
                        <CarouselPrevious />
                        <CarouselContent className="w-full">
                            {vocabularies.map((vocab: Vocabulary) => {
                                const vocabIsCorrect = correctAnswers.has(vocab.id);
                                const vocabIsFlipped = flippedCards.has(vocab.id);

                                return (
                                    <CarouselItem key={vocab.id}>
                                        <div className="flex justify-center px-5 py-15">
                                            <FlashCard
                                                frontContent={
                                                    <div className="flex flex-col gap-2">
                                                        <div className="text-3xl font-bold">{vocab.word}</div>
                                                        {vocab.pronounce && (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className="text-muted-foreground text-lg">
                                                                    /{vocab.pronounce}/
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0"
                                                                    onClick={(e) => handlePlayAudio(vocab.word, e)}
                                                                    title="Phát âm"
                                                                >
                                                                    <Volume2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                        {vocab.partOfSpeech && (
                                                            <div className="text-muted-foreground text-sm italic">
                                                                {vocab.partOfSpeech}
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                                backContent={
                                                    <div className="flex flex-col gap-4">
                                                        <div className="text-xl font-semibold">{vocab.meaning}</div>
                                                        {vocab.exampleSentence && (
                                                            <div className="text-muted-foreground border-primary border-l-4 pl-4 text-sm italic">
                                                                &ldquo;{vocab.exampleSentence}&rdquo;
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                                width="w-full"
                                                height="h-64"
                                                disabled={isPracticeMode ? !vocabIsCorrect : false}
                                                initialFlipped={vocabIsFlipped}
                                                effect={
                                                    vocabIsCorrect ? EFlashCardEffect.CORRECT : EFlashCardEffect.NONE
                                                }
                                            />
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselNext />
                    </Carousel>
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="bg-muted relative h-2 w-1/2 overflow-hidden rounded-full">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((current + 1) / vocabularies.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <Button variant="outline" size="sm">
                            <HeartIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    {currentVocab && isPracticeMode && (
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter the meaning of the word..."
                                    value={currentInputValue}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                    className={currentIsCorrect ? "border-success focus-visible:ring-success" : ""}
                                    disabled={currentIsFlipped}
                                />
                            </div>
                            {currentIsCorrect && (
                                <div className="text-success text-sm font-medium">
                                    ✓ Correct! You can flip the card to see the answer.
                                </div>
                            )}
                        </div>
                    )}

                    {isPracticeMode && (
                        <div className="text-muted-foreground mt-4 text-center text-sm">
                            {vocabularies.length} vocabularies • Correct answers: {correctAnswers.size}/
                            {vocabularies.length}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default TopicDetailPage;
