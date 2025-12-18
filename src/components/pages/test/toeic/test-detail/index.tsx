"use client";

import * as React from "react";
import { PageTitle } from "@/components/shared";
import { useGetTest } from "@/services/index";
import { MainLayout } from "@/components/layout";
import { LIMIT_TIME_PER_TEST, TOTAL_PART_PER_TEST, TOTAL_QUESTION_PER_PART } from "@/constants/index";
import { Kbd, KbdGroup, Button, RadioGroup, RadioGroupItem } from "@/components/ui";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

const TestDetailPage = ({ testId }: { testId: string }) => {
    const { data: test } = useGetTest(testId);
    const router = useRouter();
    const pathname = usePathname();
    const partsForm = useForm<FieldValues>({
        defaultValues: {
            part: null,
        },
    });
    const testData = test?.data;

    const onSubmit = (data: FieldValues) => {
        const searchParams = new URLSearchParams();
        searchParams.append("part", data.part);
        router.push(`${pathname}/practice?${searchParams.toString()}`);
    };

    if (!testData) return null;
    return (
        <MainLayout>
            <div className="flex h-full w-full flex-col gap-3 rounded-2xl border border-foreground p-5">
                <PageTitle title={testData?.test.title} />
                <span>{testData?.test.description}</span>
                <KbdGroup>
                    <Kbd>Time Limit: {LIMIT_TIME_PER_TEST} minutes</Kbd>
                    <span className="text-gray-500">|</span>
                    <Kbd>Total Parts: {TOTAL_PART_PER_TEST}</Kbd>
                    <span className="text-gray-500">|</span>
                    <Kbd>Total Questions: {TOTAL_QUESTION_PER_PART.total}</Kbd>
                </KbdGroup>

                <div className="h-full w-full">
                    <span>Choose your part</span>
                    <form onSubmit={partsForm.handleSubmit(onSubmit)}>
                        <div className="flex h-full w-full flex-col gap-2">
                            <Controller
                                name="part"
                                control={partsForm.control}
                                render={({ field }) => (
                                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                                        {testData?.parts.map((part) => (
                                            <div key={part.partId} className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    id={part.partId.toString()}
                                                    value={part.partId.toString()}
                                                />
                                                <div key={part.partId} className="flex items-center gap-2">
                                                    <span>
                                                        Part {part.partNumber} (
                                                        {
                                                            TOTAL_QUESTION_PER_PART[
                                                                part.partNumber as keyof typeof TOTAL_QUESTION_PER_PART
                                                            ]
                                                        }
                                                        ){" - "}
                                                        {part.partTitle}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        <Button type="submit" className="mt-5">
                            Start Test
                        </Button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default TestDetailPage;
