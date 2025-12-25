"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTopPoint, useGetTopStreakDay } from "@/src/services/leader-board/leader-board.api";
import { LeaderBoard } from "@/src/services/leader-board/leader-board.interface";
import { Skeleton } from "../../ui";

export default function Leaderboard() {
    const { data: points, isLoading: isLoadingPoint } = useGetTopPoint();
    const { data: streakday, isLoading: isLoadingStreakDay } = useGetTopStreakDay();
    if (!points?.data) return null;
    if (!streakday?.data) return null;
    return (
        <div className="w-full max-w-md rounded-lg bg-white shadow">
            <Tabs defaultValue="point" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-gray-100 p-0">
                    <TabsTrigger value="point">Points</TabsTrigger>
                    <TabsTrigger value="streak-day">Streak Days</TabsTrigger>
                </TabsList>
                <TabsContent value="point">
                    {isLoadingPoint
                        ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-36 w-full" />)
                        : points.data.map((leaderBoard: LeaderBoard, index: number) => (
                              <div key={leaderBoard.id ?? index} className="space-y-2">
                                  <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 shadow-sm hover:bg-gray-50">
                                      {/* Rank */}
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                                          {index + 1}
                                      </div>

                                      {/* Title */}
                                      <div className="flex-1">
                                          <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                                              {leaderBoard?.user?.username}
                                          </p>
                                          <p className="text-xs text-gray-400">BXH điểm</p>
                                      </div>

                                      {/* Points */}
                                      <div className="flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-1">
                                          <span className="text-sm">⭐</span>
                                          <span className="text-sm font-bold text-purple-600">
                                              {leaderBoard.points}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </TabsContent>

                <TabsContent value="streak-day">
                    {isLoadingStreakDay
                        ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-36 w-full" />)
                        : streakday.data.map((leaderBoard: LeaderBoard, index: number) => (
                    <div key={leaderBoard.id ?? index} className="space-y-2">
                        <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 shadow-sm hover:bg-gray-50">
                            {/* Rank */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                               {index + 1}
                            </div>

                            {/* Title */}
                            <div className="flex-1">
                                <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                                    {leaderBoard?.user?.username}
                                </p>
                                <p className="text-xs text-gray-400">BXH điểm</p>
                            </div>

                            {/* Points */}
                            <div className="flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-1">
                                <span className="text-sm">⭐</span>
                                <span className="text-sm font-bold text-purple-600">{leaderBoard.points}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
