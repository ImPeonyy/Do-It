"use client";

import * as React from "react";
import { HorizontalCard, ProfileCard, TopicCard } from "@/components/shared";
import { MainLayout } from "@/components/layout";
import { useGetUserProfile } from "@/src/services";

const DashboardPage = () => {
    const [isActive, setIsActive] = React.useState(false);
    const { data: userProfile } = useGetUserProfile();

    if (!userProfile?.data) return null;
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
                    <div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <HorizontalCard
                                key={i}
                                title={`Horizontal Card ${i + 1}`}
                                description="This is a horizontal card"
                                image="/mezon-logo.png"
                                link="/horizontal-card"
                            />
                        ))}
                    </div>
                </div>
            }
        >
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    {[...Array(3)].map((_, i) => (
                        <TopicCard
                            key={i}
                            title={`Topic ${i + 1}`}
                            image="/mezon-logo.png"
                            link={`/topic-${i + 1}`}
                            isActive={isActive}
                            onClick={() => setIsActive(!isActive)}
                        />
                    ))}
                </div>
                <div className="bg-accent h-100 rounded-4xl p-5 shadow-2xl">
                    <h1>Dashboard</h1>
                </div>
            </div>
        </MainLayout>
    );
};

export default DashboardPage;
