"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { PageTitle } from "@/components/shared";
import { Button, Carousel, FlashCard, Input } from "@/src/components/ui";
import fakeData from "../fake-data.json";
import { WORD_TYPE_MAP } from "@/constants/index";
import { shuffleArray } from "@/utils/misc.util";
import { EFlashCardEffect } from "@/src/components/ui/flash-card";

const VocabularyLearnPage = () => {
    const [shuffledVocabulary, setShuffledVocabulary] = React.useState<typeof fakeData.vocabulary>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isCorrect, setIsCorrect] = React.useState<EFlashCardEffect>(EFlashCardEffect.NONE);
    const [flipSignal, setFlipSignal] = React.useState(0);
    const answerForm = useForm<{ answer: string }>({
        defaultValues: {
            answer: "",
        },
    });

    React.useEffect(() => {
        setShuffledVocabulary(shuffleArray(fakeData.vocabulary));
    }, []);

    React.useEffect(() => {
        setIsCorrect(EFlashCardEffect.NONE);
        setFlipSignal(0);
    }, [currentIndex]);

    const checkAnswer = (answer: string) => {
        return shuffledVocabulary[currentIndex].definitions.some((definition) =>
            definition.toLowerCase().includes(answer.toLowerCase())
        );
    };

    const onSubmit = (data: { answer: string }) => {
        if (checkAnswer(data.answer)) {
            setIsCorrect(EFlashCardEffect.CORRECT);
            setFlipSignal(1);
        } else {
            setIsCorrect(EFlashCardEffect.INCORRECT);
        }
    };

    const renderItem = (item: (typeof fakeData.vocabulary)[number], i: number) => {
        console.log(currentIndex, i);
        return (
            <div className="flex items-center justify-center">
                <FlashCard
                    className="bg-amber-200"
                    frontContent={
                        <div className="flex flex-col items-center justify-center gap-5">
                            <span className="text-3xl font-bold">{item.word}</span>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-lg">
                                    ({WORD_TYPE_MAP[item.type as keyof typeof WORD_TYPE_MAP] ?? item.type})
                                </span>
                                <span className="text-lg text-gray-500">{item.pronunciation}</span>
                            </div>
                        </div>
                    }
                    backContent={<div>{item.definitions.join(", ")}</div>}
                    effect={currentIndex === i ? isCorrect : EFlashCardEffect.NONE}
                    disabled={currentIndex !== i || isCorrect !== EFlashCardEffect.CORRECT}
                    flipSignal={currentIndex === i ? flipSignal : 0}
                />
            </div>
        );
    };

    return (
        <div className="1flex flex-col gap-10">
            <PageTitle title="Vocabulary Learn" />
            <div className="flex flex-col gap-10">
                <Carousel
                    items={shuffledVocabulary}
                    renderItem={renderItem}
                    type="flashCard"
                    onIndexChange={setCurrentIndex}
                />
                <div className="flex flex-col items-center justify-center">
                    <form
                        className="flex flex-col items-center justify-center gap-5"
                        onSubmit={answerForm.handleSubmit(onSubmit)}
                    >
                        <Controller
                            control={answerForm.control}
                            name="answer"
                            render={({ field }) => <Input type="text" placeholder="Enter your answer" {...field} />}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VocabularyLearnPage;
