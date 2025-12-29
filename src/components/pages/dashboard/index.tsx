"use client";

import * as React from "react";
import { ProfileCard, TopicCard } from "@/components/shared";
import { MainLayout } from "@/components/layout";
import { useGetUserProfile, Topic, useGetRandomTopics } from "@/src/services";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DashboardPage = () => {
    const [isActive, setIsActive] = React.useState(false);
    const { data: userProfile } = useGetUserProfile();
    const { data: topics } = useGetRandomTopics();

    if (!userProfile?.data) return null;
    if (!topics?.data) return null;

    return (
        <MainLayout
            subContent={
                <div className="flex flex-col gap-5">
                    <div>
                        <ProfileCard
                            image="/mezon-logo.png"
                            name={userProfile.data.username}
                            badges={userProfile.data.badges}
                            points={userProfile.data.points}
                            streaks={userProfile.data.streakDays || 0}
                        />
                    </div>
                    <div className="flex min-h-[400px] items-center justify-center text-2xl font-bold">Coming Soon</div>
                </div>
            }
        >
            <div className="flex flex-col gap-5">
                <div>
                    <div className="flex items-center justify-between pr-10">
                        <span className="text-2xl font-bold">Topics</span>
                        <Link
                            href={`/flashcard/topic`}
                            className="text-primary justify-centers flex items-center text-sm hover:underline"
                        >
                            <span>View All</span> <ArrowRight size={20} />{" "}
                        </Link>
                    </div>
                    <div className="flex gap-5">
                        <Carousel className="w-full">
                            <CarouselContent className="w-full p-5">
                                {topics.data.slice(0, 5).map((topic: Topic, i: number) => (
                                    <CarouselItem key={i} className="basis-1/3">
                                        <TopicCard
                                            title={topic.name}
                                            image={"/mezon-logo.png"}
                                            link={`/flashcard/topic/${topic.id}`}
                                            isActive={isActive}
                                            onClick={() => setIsActive(!isActive)}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
                <div className="border-foreground h-100 rounded-4xl border p-5 shadow-2xl">
                    <div className="flex min-h-[400px] items-center justify-center text-2xl font-bold">Coming Soon</div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DashboardPage;
