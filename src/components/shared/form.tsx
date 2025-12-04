"use client";

import * as React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input, Button, FlashCard } from "@/components/ui";
import { EFlashCardEffect } from "@/components/ui/flash-card";
import { formValidation } from "@/libs/validations/form.validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
    const form = useForm<z.infer<typeof formValidation>>({
        defaultValues: {
            answer: "",
        },
        resolver: zodResolver(formValidation),
    });
    const [answer, setAnswer] = React.useState("");
    const [status, setStatus] = React.useState(EFlashCardEffect.NONE);
    const word = "personality";
    const definition = ["Nhân cách", "Tính cách"];
    const pronunciation = "/ˌpɜː.sənˈæl.ə.ti/";

    const onSubmit = (data: FieldValues) => {
        setAnswer(data.answer);
    };

    React.useEffect(() => {
        const isCorrect = definition.some((item) => item.toLowerCase().includes(answer.toLowerCase()));
        setStatus(EFlashCardEffect.INCORRECT);
        if (isCorrect) {
            setStatus(EFlashCardEffect.CORRECT);
        }
        if (answer === "") {
            setStatus(EFlashCardEffect.NONE);
        }
    }, [answer]);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-6 p-6">
                <div className="flex flex-col items-center gap-2">
                    <FlashCard
                        disabled={status !== EFlashCardEffect.CORRECT}
                        effect={status}
                        frontContent={
                            <div>
                                <h3 className="text-lg font-semibold">{word}</h3>
                                <p className="text-sm">{pronunciation}</p>
                            </div>
                        }
                        backContent={
                            <div>
                                <p className="text-sm">{definition.join(", ")}</p>
                            </div>
                        }
                    />
                    <span className="text-xs text-slate-500">Click or press Enter/Space to flip</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Controller
                    control={form.control}
                    name="answer"
                    render={({ field }) => <Input type="text" placeholder="Enter your answer" {...field} />}
                />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}
