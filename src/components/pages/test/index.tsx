"use client";

import * as React from "react";
import { PageTitle, ToeicTestCard } from "@/components/shared";
import { Test } from "@/src/services";
import { PaginationResponse } from "@/src/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TestPageProps {
    testsPagination: PaginationResponse<Test[]>;
}

const TestPage = ({ testsPagination }: TestPageProps) => {
    if (!testsPagination?.data) return null;

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Test" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pr-10">
                    <span className="text-2xl font-bold">Toeic Test</span>
                    <Link
                        href={`/test/toeic`}
                        className="text-primary justify-centers flex items-center text-sm hover:underline"
                    >
                        <span>View All</span> <ArrowRight size={20} />{" "}
                    </Link>
                </div>
                <div className="flex gap-4">
                    {testsPagination.data.map((test: Test) => (
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
