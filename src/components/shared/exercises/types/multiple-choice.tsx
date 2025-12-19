import * as React from "react";
import { RadioGroup, RadioGroupItem, Label } from "@/components/ui";
import Image from "next/image";

export interface MultipleChoiceProps {
    questionNumber?: number;
    question: string;
    imageUrl?: string;
    audioUrl?: string;
    options: { value: string; answer: string }[];
    value?: string;
    onChange?: (val: string) => void;
}

const MultipleChoice = ({
    questionNumber,
    question,
    imageUrl,
    audioUrl,
    options,
    value,
    onChange,
}: MultipleChoiceProps) => {
    const sortedOptions = options.sort((a, b) => a.value.localeCompare(b.value));
    
    return (
        <div className="flex flex-col gap-5">
            <span className="text-xl font-medium">{questionNumber ? `${questionNumber}. ${question}` : question}</span>

            <div className="flex gap-5">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt="question"
                        width={100}
                        height={100}
                        className="h-1/2 w-1/2 object-cover"
                    />
                )}
                <div className="flex flex-col gap-5">
                    {audioUrl && <audio src={audioUrl} controls />}
                    <RadioGroup className="flex flex-col justify-around gap-2" value={value} onValueChange={onChange}>
                        {sortedOptions.map((option) => (
                            <div className="flex items-center gap-2" key={ `${questionNumber}-${option.value}`}>
                                <RadioGroupItem id={option.value} value={option.value} />
                                <Label htmlFor={option.value} className="text-md">
                                    {option.value}. {option.answer}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
};

export default MultipleChoice;
