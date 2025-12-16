"use client";

import * as React from "react";
import { PageTitle } from "@/components/shared";
import { useGetTest } from "@/services/index";
import { MainLayout } from "@/components/layout";
import { LIMIT_TIME_PER_TEST, TOTAL_PART_PER_TEST, TOTAL_QUESTION_PER_PART } from "@/constants/index";
import { Kbd, KbdGroup, Checkbox, Button } from "@/components/ui";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

const TestDetailPage = ({ testId }: { testId: string }) => {
    const { data: test } = useGetTest(testId);
    const router = useRouter();
    const pathname = usePathname();
    const partsForm = useForm<FieldValues>({
        defaultValues: {},
    });
    const testData = test?.data;

    React.useEffect(() => {
        if (!testData) return;

        const defaultValues = testData.parts.reduce(
            (acc, part) => {
                acc[part.partId.toString()] = false;
                return acc;
            },
            {} as Record<string, boolean>
        );

        partsForm.reset(defaultValues);
    }, [testData, partsForm]);

    const onSubmit = (data: FieldValues) => {
        const searchParams = new URLSearchParams();
        Object.keys(data).forEach((key) => {
            if (data[key]) {
                searchParams.append("part", key);
            }
        });
        router.push(`${pathname}/practice?${searchParams.toString()}`);
    };

    if (!testData) return null;
    return (
        <MainLayout>
            <div className="flex h-full w-full flex-col gap-3 rounded-2xl border border-red-500 p-5">
                <PageTitle title={testData.title} />
                <span>{testData.description}</span>
                <KbdGroup>
                    <Kbd>Time Limit: {LIMIT_TIME_PER_TEST} minutes</Kbd>
                    <span className="text-gray-500">|</span>
                    <Kbd>Total Parts: {TOTAL_PART_PER_TEST}</Kbd>
                    <span className="text-gray-500">|</span>
                    <Kbd>Total Questions: {TOTAL_QUESTION_PER_PART.total}</Kbd>
                </KbdGroup>

                <div className="h-full w-full">
                    <span>Choose your parts</span>
                    <form onSubmit={partsForm.handleSubmit(onSubmit)}>
                        <div className="flex h-full w-full flex-col gap-2">
                            {testData.parts.map((part) => (
                                <div key={part.partId} className="flex items-center gap-2">
                                    <Controller
                                        name={part.partId.toString()}
                                        control={partsForm.control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id={part.partId.toString()}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                {...field}
                                            />
                                        )}
                                    />
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
                            ))}
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
