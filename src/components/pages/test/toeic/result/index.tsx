"use client";

import * as React from "react";
import { useGetTestResult } from "@/services/index";
import { MainLayout } from "@/components/layout";
import { Badge, Separator, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { cn } from "@/libs/utils";

interface ResultPageProps {
    testId: string;
}

const MAX_SECTION_SCORE = 495;

const ResultPage = ({ testId }: ResultPageProps) => {
    const { data: testResult, isLoading, isError } = useGetTestResult(testId);
    const result = testResult?.data;

    const { totalQuestions, totalCorrect, accuracy } = React.useMemo(() => {
        if (!result) {
            return { totalQuestions: 0, totalCorrect: 0, accuracy: 0 };
        }

        const totalQuestions = result.parts?.reduce((sum, part) => sum + (part.total ?? 0), 0) ?? 0;
        const totalCorrect = result.parts?.reduce((sum, part) => sum + (part.correct ?? 0), 0) ?? 0;
        const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        return { totalQuestions, totalCorrect, accuracy };
    }, [result]);

    const getAccuracyLabel = (value: number) => {
        if (value >= 90) return "Hiệu suất rất cao, hãy duy trì nhịp độ học hiện tại.";
        if (value >= 75) return "Kết quả tốt, bạn chỉ cần tinh chỉnh thêm ở một số dạng câu hỏi.";
        if (value >= 50) return "Mức độ ổn, hãy tập trung luyện lại những phần có điểm thấp.";
        if (value > 0) return "Bạn đã có nền tảng, hãy xem kỹ lại các câu sai để cải thiện.";
        return "Hãy bắt đầu luyện tập để xây dựng nền tảng vững chắc hơn.";
    };

    const getAccuracyBadgeVariant = (value: number) => {
        if (value >= 75) return "success" as const;
        if (value >= 50) return "warning" as const;
        return "destructive" as const;
    };

    if (isLoading) {
        return (
            <div className="container py-10">
                <Skeleton className="mb-6 h-40 w-full rounded-2xl" />
                <div className="grid gap-4 md:grid-cols-3">
                    <Skeleton className="h-28 w-full rounded-2xl" />
                    <Skeleton className="h-28 w-full rounded-2xl" />
                    <Skeleton className="h-28 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isError || !result) {
        return (
            <div className="container flex min-h-[40vh] items-center justify-center">
                <div className="max-w-md text-center">
                    <h1 className="text-lg font-semibold">Không thể tải kết quả bài thi</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Đã xảy ra lỗi trong quá trình lấy dữ liệu. Vui lòng kiểm tra kết nối mạng và thử lại sau.
                    </p>
                </div>
            </div>
        );
    }

    const listeningPercent = Math.min(100, Math.round((result.score.listeningScore / MAX_SECTION_SCORE) * 100));
    const readingPercent = Math.min(100, Math.round((result.score.readingScore / MAX_SECTION_SCORE) * 100));

    return (
        <MainLayout
            subContent={
                <aside className="sticky top-24 space-y-4 pl-5">
                    <div className="rounded-2xl border bg-card p-4 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-black">Tổng kết</p>
                        <p className="mt-3 text-3xl font-bold tabular-nums text-black">{result.score.totalScore}</p>
                        <p className="mt-1 text-xs text-black">
                            {totalCorrect}/{totalQuestions} câu đúng ({accuracy}% chính xác)
                        </p>
                        <Separator className="my-3" />
                        <div className="space-y-1.5 text-xs text-black">
                            <p>
                                Listening:{" "}
                                <span className="font-medium text-black">
                                    {result.score.listeningScore}/{MAX_SECTION_SCORE}
                                </span>
                            </p>
                            <p>
                                Reading:{" "}
                                <span className="font-medium text-black">
                                    {result.score.readingScore}/{MAX_SECTION_SCORE}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-muted/40 p-4 text-xs text-black shadow-sm">
                        <p className="text-sm font-medium text-foreground">Gợi ý tiếp theo</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                            <li>Xem lại chi tiết các câu sai ở từng part.</li>
                            <li>Ghi chú lại những dạng câu hỏi thường xuyên trả lời sai.</li>
                            <li>Luyện lại các part có tỉ lệ đúng thấp để cải thiện điểm.</li>
                        </ul>
                    </div>
                </aside>
            }
        >
            <div className="space-y-8 py-8">
                <section className="rounded-2xl border bg-linear-to-br from-primary/10 via-secondary/10 to-background p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Kết quả bài thi TOEIC
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold">{result.testTitle}</h1>
                            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                                Bạn đã hoàn thành bài thi với {accuracy}% câu trả lời chính xác. Hãy xem chi tiết từng phần
                                bên dưới để biết mình đang mạnh ở đâu và cần cải thiện phần nào.
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-2 md:items-end">
                            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-xs text-primary">
                                Tổng điểm
                            </Badge>
                            <p className="text-4xl font-bold leading-none tabular-nums">{result.score.totalScore}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Listening {result.score.listeningScore} · Reading {result.score.readingScore}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-black">
                                        Listening
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-black">
                                        {result.score.listeningScore}/{MAX_SECTION_SCORE}
                                    </p>
                                </div>
                                <Badge
                                    variant={getAccuracyBadgeVariant(listeningPercent)}
                                    className="text-[10px] uppercase tracking-wide text-black"
                                >
                                    {listeningPercent}%
                                </Badge>
                            </div>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{ width: `${listeningPercent}%` }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-black">
                                        Reading
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-black">
                                        {result.score.readingScore}/{MAX_SECTION_SCORE}
                                    </p>
                                </div>
                                <Badge
                                    variant={getAccuracyBadgeVariant(readingPercent)}
                                    className="text-[10px] uppercase tracking-wide text-black"
                                >
                                    {readingPercent}%
                                </Badge>
                            </div>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{ width: `${readingPercent}%` }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-black">
                                        Độ chính xác tổng
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-black">{accuracy}%</p>
                                </div>
                                <Badge
                                    variant={getAccuracyBadgeVariant(accuracy)}
                                    className="text-[10px] uppercase tracking-wide"
                                >
                                    {totalCorrect}/{totalQuestions} câu đúng
                                </Badge>
                            </div>
                            <p className="mt-3 text-xs text-black">{getAccuracyLabel(accuracy)}</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg text-black font-semibold">Tổng quan theo từng Part</h2>
                            <p className="text-sm text-black">
                                Mỗi thẻ bên dưới thể hiện số câu đúng, tổng số câu và tỉ lệ chính xác của từng part.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {result.parts.map((part) => {
                            const partAccuracy = part.total ? Math.round((part.correct / part.total) * 100) : 0;

                            return (
                                <div
                                    key={part.partNumber}
                                    className="flex flex-col justify-between rounded-xl border bg-background/80 p-4 shadow-sm transition-colors hover:border-primary/60"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-white">
                                                Part {part.partNumber}
                                            </p>
                                            <p className="mt-1 text-base font-semibold">
                                                {part.correct}/{part.total} câu đúng
                                            </p>
                                        </div>
                                        <Badge
                                            variant={getAccuracyBadgeVariant(partAccuracy)}
                                            className="text-[10px] uppercase tracking-wide"
                                        >
                                            {partAccuracy}%
                                        </Badge>
                                    </div>
                                    <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                                        <div
                                            className={cn(
                                                "h-full rounded-full",
                                                partAccuracy >= 75
                                                    ? "bg-success"
                                                    : partAccuracy >= 50
                                                      ? "bg-warning"
                                                      : "bg-error"
                                            )}
                                            style={{ width: `${partAccuracy}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-white">{getAccuracyLabel(partAccuracy)}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg text-black font-semibold">Chi tiết từng câu hỏi</h2>
                            <p className="text-sm text-black">
                                Chọn từng part để xem câu nào làm đúng, câu nào làm sai và đáp án chính xác tương ứng.
                            </p>
                        </div>
                    </div>
                    <Tabs defaultValue={String(result.parts[0]?.partNumber ?? "")}>
                        <TabsList className="w-full justify-start overflow-x-auto">
                            {result.parts.map((part) => (
                                <TabsTrigger key={part.partNumber} value={String(part.partNumber)} className="px-4">
                                    Part {part.partNumber}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {result.parts.map((part) => {
                            const partAccuracy = part.total ? Math.round((part.correct / part.total) * 100) : 0;

                            return (
                                <TabsContent key={part.partNumber} value={String(part.partNumber)} className="mt-4">
                                    <div className="mb-4 flex items-center justify-between rounded-xl border bg-muted/40 px-4 py-3 text-sm">
                                        <div>
                                            <p className="font-medium text-black">Part {part.partNumber}</p>
                                            <p className="text-xs text-black">
                                                Bạn trả lời đúng {part.correct}/{part.total} câu ({partAccuracy}%).
                                            </p>
                                        </div>
                                        <Badge
                                            variant={getAccuracyBadgeVariant(partAccuracy)}
                                            className="text-[10px] uppercase tracking-wide"
                                        >
                                            {partAccuracy}% chính xác
                                        </Badge>
                                    </div>

                                    <div className="overflow-hidden rounded-xl border">
                                        <div className="max-md:hidden grid grid-cols-[minmax(0,3rem)_minmax(0,2.5fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] items-center gap-3 border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
                                            <span className="text-center">Câu</span>
                                            <span>Nội dung</span>
                                            <span>Đáp án đã chọn</span>
                                            <span>Đáp án đúng</span>
                                        </div>
                                        <div className="divide-y">
                                            {part.questions.map((question) => {
                                                const isCorrect = question.isCorrect;

                                                return (
                                                    <div
                                                        key={question.questionNumber}
                                                        className={cn(
                                                            "grid gap-3 px-4 py-3 text-sm transition-colors",
                                                            "max-md:grid-cols-1",
                                                            "md:grid-cols-[minmax(0,3rem)_minmax(0,2.5fr)_minmax(0,1.5fr)_minmax(0,1.5fr)]",
                                                            isCorrect ? "bg-success/5" : "bg-error/5"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground md:justify-center">
                                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs font-semibold">
                                                                {question.questionNumber}
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-muted-foreground md:text-sm">
                                                                Câu hỏi {question.questionNumber}
                                                            </p>
                                                            <div className="mt-1 flex items-center gap-2 text-xs md:hidden">
                                                                <Badge
                                                                    variant={isCorrect ? "success" : "destructive"}
                                                                    className="text-[10px] uppercase tracking-wide"
                                                                >
                                                                    {isCorrect ? "Đúng" : "Sai"}
                                                                </Badge>
                                                                <span className="text-muted-foreground">
                                                                    {isCorrect ? "Trả lời chính xác" : "Trả lời chưa đúng"}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1 text-xs md:text-sm">
                                                            <p className="font-medium">
                                                                Đã chọn:{" "}
                                                                <span
                                                                    className={cn(
                                                                        "rounded-md px-1.5 py-0.5",
                                                                        isCorrect
                                                                            ? "bg-success/20 text-success"
                                                                            : "bg-error/10 text-error"
                                                                    )}
                                                                >
                                                                    {question.chosenOption}
                                                                </span>
                                                            </p>
                                                        </div>

                                                        <div className="space-y-1 text-xs md:text-sm">
                                                            <p className="font-medium">
                                                                Đáp án đúng:{" "}
                                                                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-primary">
                                                                    {question.correctOption}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </section>
            </div>
        </MainLayout>
    );
};

export default ResultPage;
