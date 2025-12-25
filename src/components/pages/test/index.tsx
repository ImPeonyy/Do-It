"use client";

import * as React from "react";
import { PageTitle, ToeicTestCard } from "@/components/shared";
import { useGetTests } from "@/services/index";
import { Skeleton } from "@/components/ui";

const TestPage = () => {
  const { data, isLoading } = useGetTests();

  if (isLoading) {
    return <Skeleton className="h-40 w-full" />;
  }

  if (!data?.data?.length) return null;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Test" />
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold">Toeic Test</span>

        <div className="flex gap-4">
          {data.data.map((test) => (
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
