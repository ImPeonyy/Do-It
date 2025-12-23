"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { AiLoading, TopicCard } from "@/components/shared";
import { useGetTopics } from "@/src/services";
import PageTitle from "@/components/shared/page-title";
import MainPagination from "@/src/components/shared/paginations/main-pagination";

interface TopicPageProps {
    page: number;
    limit: number;
    type: "learn" | "test";
}

const TopicPage = ({ page, limit, type }: TopicPageProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: topicsData, isLoading } = useGetTopics({ page: page || 1, limit: limit || 6 });
    const pagination = topicsData?.pagination;

    const topics = topicsData?.data || [];
    const totalPages = pagination?.totalPages || 1;
    const currentPage = page || 1;

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex min-h-[400px] items-center justify-center">
                    <AiLoading />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-col gap-8">
                <PageTitle title="Topics" />

                {topics.length === 0 ? (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-muted-foreground text-lg">No topics found</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-15">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {topics.map((topic) => (
                                <TopicCard
                                    key={topic.id}
                                    title={topic.name}
                                    image="/mezon-logo.png"
                                    link={`${type ? `/flashcard/topic/${topic.id}?type=${type}` : `/flashcard/topic/${topic.id}`}`}
                                />
                            ))}
                        </div>
                        <MainPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            getHref={(page) => `/flashcard/topic?page=${page}&limit=${limit}&type=${type}`}
                        />
                        
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TopicPage;
