"use client";

import * as React from "react";
import { PageTitle, ToeicTestCard } from "@/components/shared";
import { Test } from "@/src/services";
import { ApiResponse } from "@/src/constants";

interface TestPageProps {
    tests: ApiResponse<Test[]>;
}

const TestPage = ({ tests }: TestPageProps) => {

    if (!tests?.data) return null;

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Test" />
            <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold">Toeic Test</span>
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
            </div>
        </div>
    );
};

export default TestPage;
