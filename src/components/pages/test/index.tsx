"use client";

import * as React from "react";
import { PageTitle, ToeicTestCard } from "@/components/shared";
import { useGetTests, Test } from "@/services/index";
import { Skeleton } from "@/components/ui";

const TestPage = () => {
    const { data: tests, isLoading } = useGetTests();

    if (!tests?.data) return null;

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Test" />
            <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold">Toeic Test</span>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-36 w-full" />)
                ) : (
                    <div className="flex gap-4">
                        {tests.data.map((test: Test) => (
                            <ToeicTestCard
                                key={test.id}
                                title={test.title}
                                description={test.description}
                                path={`/toeic/${test.id}`}
                                partsProcess={test.partsProcess}
                                createdAt={test.createdAt}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPage;
