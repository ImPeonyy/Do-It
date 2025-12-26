"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTopPoint, useGetTopStreakDay, LeaderBoard } from "@/src/services";
import { Skeleton } from "@/components/ui";

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
                              <div key={leaderBoard.id ?? index}>
                                  <div className="flex items-center justify-between gap-3 bg-white px-3 py-2 hover:bg-gray-50">
                                      <div className="flex min-w-0 items-center gap-3">
                                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                                              {index + 1}
                                          </div>
                                          <div className="flex min-w-0 flex-col">
                                              <p className="truncate text-sm font-semibold text-gray-900">
                                                  {leaderBoard?.user?.username}
                                              </p>
                                              <p className="text-xs text-gray-400">BXH điểm</p>
                                          </div>
                                      </div>
                                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-purple-50 px-2 py-1">
                                          <span className="text-sm">⭐</span>
                                          <span className="text-sm font-bold text-purple-600">
                                              {leaderBoard.points}
                                          </span>
                                      </div>
                                  </div>
                                  {index !== points.data.length - 1 && (
                                      <div className="mx-5 border-b border-gray-200"></div>
                                  )}
                              </div>
                          ))}
                </TabsContent>

                <TabsContent value="streak-day">
                    {isLoadingStreakDay
                        ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-36 w-full" />)
                        : streakday.data.map((leaderBoard: LeaderBoard, index: number) => (
                              <div key={leaderBoard.id ?? index} className="space-y-2">
                                  <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 shadow-sm hover:bg-gray-50">
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                                          {index + 1}
                                      </div>

                                      <div className="flex-1">
                                          <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                                              {leaderBoard?.user?.username}
                                          </p>
                                          <p className="text-xs text-gray-400">BXH điểm</p>
                                      </div>

                                      <div className="flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-1">
                                          <span className="text-sm">⭐</span>
                                          <span className="text-sm font-bold text-purple-600">
                                              {leaderBoard.streakDays}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
