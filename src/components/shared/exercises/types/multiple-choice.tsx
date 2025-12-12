import * as React from "react";
import { RadioGroup, RadioGroupItem, Label } from "@/components/ui";

export interface MultipleChoiceProps {
    question: string;
    options: { value: string; answer: string }[];
    value?: string;
    onChange?: (val: string) => void;
}

const MultipleChoice = ({ question, options, value, onChange }: MultipleChoiceProps) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-xl font-medium">{question}</span>
            <RadioGroup
                className="flex flex-col justify-around gap-2"
                value={value}
                onValueChange={onChange}
            >
                {options.map((option) => (
                    <div className="flex items-center gap-2" key={option.value}>
                        <RadioGroupItem id={option.value} value={option.value} />
                        <Label htmlFor={option.value} className="text-md">
                            {option.value}. {option.answer}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default MultipleChoice;
