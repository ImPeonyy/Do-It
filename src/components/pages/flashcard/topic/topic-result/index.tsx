"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TopicTestResultResponse } from "@/src/services";
import { useQueryClient } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout";
import { Badge, Separator, Button } from "@/components/ui";
import { cn } from "@/libs/utils";
import { CheckCircle2, XCircle, TrendingUp, TrendingDown, ArrowLeft } from "lucide-react";
import { EFlashCardMode } from "../..";
import MainPagination from "@/components/shared/paginations/main-pagination";

interface TopicResultPageProps {
    topicId: string;
}

const TopicResultPage = ({ topicId }: TopicResultPageProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const topicTestResult = queryClient.getQueryData<TopicTestResultResponse>(["topic-test-result", topicId]);
    console.log("topicTestResult", topicTestResult);
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;
    
    const accuracy = React.useMemo(() => {
        if (!topicTestResult) return 0;
        return topicTestResult.totalQuestions
            ? Math.round((topicTestResult.correctCount / topicTestResult.totalQuestions) * 100)
            : 0;
    }, [topicTestResult]);
    
    const paginatedQuestions = React.useMemo(() => {
        if (!topicTestResult?.questions) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return topicTestResult.questions.slice(startIndex, endIndex);
    }, [topicTestResult, currentPage]);
    
    const totalPages = React.useMemo(() => {
        if (!topicTestResult?.questions) return 1;
        return Math.ceil(topicTestResult.questions.length / itemsPerPage);
    }, [topicTestResult]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        scrollTo({
            top: 500,
            behavior: "smooth",
        });
    };

    const getAccuracyLabel = (value: number) => {
        if (value >= 90) return "Xuất sắc! Bạn đã nắm vững từ vựng này.";
        if (value >= 75) return "Tốt! Bạn đã hiểu rõ hầu hết các từ vựng.";
        if (value >= 50) return "Ổn định. Hãy ôn tập thêm để cải thiện.";
        if (value > 0) return "Cần cải thiện. Hãy xem lại các từ vựng đã sai.";
        return "Hãy bắt đầu học lại từ vựng này.";
    };

    const getAccuracyBadgeVariant = (value: number) => {
        if (value >= 75) return "success" as const;
        if (value >= 50) return "warning" as const;
        return "destructive" as const;
    };

    if (!topicTestResult) {
        return (
            <div className="container py-10">
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="max-w-md text-center">
                        <h1 className="text-lg font-semibold">Không tìm thấy kết quả</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Kết quả bài test không tồn tại hoặc đã hết hạn. Vui lòng làm lại bài test.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => router.push(`/flashcard/topic/${topicId}?mode=${EFlashCardMode.TEST}`)}
                        >
                            <ArrowLeft className="mr-2 size-4" />
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <MainLayout
            subContent={
                <aside className="sticky top-24 space-y-4 pl-5">
                    <div className="rounded-2xl border bg-card p-4 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-black">Tổng kết</p>
                        <div className="mt-3 flex items-baseline gap-2">
                            <p className="text-3xl font-bold tabular-nums text-black">{topicTestResult.correctCount}</p>
                            <p className="text-lg text-black">/{topicTestResult.totalQuestions}</p>
                        </div>
                        <p className="mt-1 text-xs text-black">
                            {accuracy}% chính xác ({topicTestResult.correctCount} câu đúng)
                        </p>
                        <Separator className="my-3" />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-lg">
                                <span className="text-muted-foreground">Điểm thay đổi:</span>
                                <div className="flex items-center gap-1">
                                    {topicTestResult.scoreChange >= 0 ? (
                                        <TrendingUp className="size-3 text-success" />
                                    ) : (
                                        <TrendingDown className="size-3 text-error" />
                                    )}
                                    <span
                                        className={cn(
                                            "font-medium",
                                            topicTestResult.scoreChange >= 0 ? "text-success" : "text-error"
                                        )}
                                    >
                                        {topicTestResult.scoreChange >= 0 ? "+" : ""}
                                        {topicTestResult.scoreChange}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-muted/40 p-4 text-xs text-muted-foreground shadow-sm">
                        <p className="text-sm font-medium text-black">Gợi ý tiếp theo</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-black">
                            <li>Xem lại chi tiết các câu đã trả lời sai.</li>
                            <li>Ghi chú lại những từ vựng chưa nắm vững.</li>
                            <li>Luyện tập lại để cải thiện điểm số.</li>
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
                                Kết quả bài test từ vựng
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold">Kết quả kiểm tra</h1>
                            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                                Bạn đã hoàn thành bài test với {accuracy}% câu trả lời chính xác. Hãy xem chi tiết từng
                                câu hỏi bên dưới để biết mình đang mạnh ở đâu và cần cải thiện phần nào.
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-2 md:items-end">
                            <Badge
                                variant={getAccuracyBadgeVariant(accuracy)}
                                className="text-xs uppercase tracking-wide"
                            >
                                {accuracy}% chính xác
                            </Badge>
                            <p className="text-4xl font-bold leading-none tabular-nums">
                                {topicTestResult.correctCount}/{topicTestResult.totalQuestions}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {topicTestResult.correctCount} câu đúng · {topicTestResult.totalQuestions -
                                    topicTestResult.correctCount}{" "}
                                câu sai
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Tổng số câu
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-black">
                                        {topicTestResult.totalQuestions}
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-[10px] uppercase tracking-wide text-black">
                                    Tổng
                                </Badge>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Số câu đúng
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-success">
                                        {topicTestResult.correctCount}
                                    </p>
                                </div>
                                <Badge variant="success" className="text-[10px] uppercase tracking-wide">
                                    Đúng
                                </Badge>
                            </div>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-success"
                                    style={{
                                        width: `${(topicTestResult.correctCount / topicTestResult.totalQuestions) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card/80 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Độ chính xác
                                    </p>
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-black">{accuracy}%</p>
                                </div>
                                <Badge
                                    variant={getAccuracyBadgeVariant(accuracy)}
                                    className="text-[10px] uppercase tracking-wide"
                                >
                                    {accuracy}%
                                </Badge>
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">{getAccuracyLabel(accuracy)}</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg text-black font-semibold">Chi tiết từng câu hỏi</h2>
                            <p className="text-sm text-black">
                                Xem lại từng câu hỏi để biết đáp án của bạn và đáp án đúng.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {paginatedQuestions.map((question, index) => {
                            const isCorrect = question.isCorrect;
                            const globalIndex = (currentPage - 1) * itemsPerPage + index;

                            return (
                                <div
                                    key={question.id}
                                    className={cn(
                                        "rounded-xl border p-4 transition-colors",
                                        isCorrect ? "bg-success/5 border-success/20" : "bg-error/5 border-error/20"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={cn(
                                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                                                        isCorrect
                                                            ? "border-success bg-success/10 text-success"
                                                            : "border-error bg-error/10 text-error"
                                                    )}
                                                >
                                                    {globalIndex + 1}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-base font-semibold text-black">{question.word}</h3>
                                                            {question.pronounce && (
                                                                <span className="text-sm text-black">
                                                                    /{question.pronounce}/
                                                                </span>
                                                            )}
                                                            {question.partOfSpeech && (
                                                                <Badge variant="outline" className="text-[10px] text-black">
                                                                    {question.partOfSpeech}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid gap-3 md:grid-cols-2">
                                                        <div className="space-y-1.5">
                                                            <p className="text-xs font-medium text-black">
                                                                Đáp án của bạn:
                                                            </p>
                                                            <div
                                                                className={cn(
                                                                    "rounded-lg border p-3 text-sm",
                                                                    isCorrect
                                                                        ? "border-success/30 bg-success/10 text-success"
                                                                        : "border-error/30 bg-error/10 text-error"
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {isCorrect ? (
                                                                        <CheckCircle2 className="size-4 shrink-0" />
                                                                    ) : (
                                                                        <XCircle className="size-4 shrink-0" />
                                                                    )}
                                                                    <span className="font-medium">{question.userAnswer}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <p className="text-xs font-medium text-black">
                                                                Đáp án đúng:
                                                            </p>
                                                            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle2 className="size-4 shrink-0" />
                                                                    <span className="font-medium">{question.meaning}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {question.exampleSentence && (
                                                        <div className="space-y-1.5">
                                                            <p className="text-xs font-medium text-black">
                                                                Ví dụ:
                                                            </p>
                                                            <p className="rounded-lg border bg-muted/40 p-3 text-sm italic text-black">
                                                                {question.exampleSentence}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <Badge
                                            variant={isCorrect ? "success" : "destructive"}
                                            className="shrink-0 text-[10px] uppercase tracking-wide"
                                        >
                                            {isCorrect ? "Đúng" : "Sai"}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {totalPages > 1 && (
                        <MainPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className=""
                        />
                    )}
                </section>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/flashcard/topic/${topicId}?mode=${EFlashCardMode.TEST}`)}
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Làm lại bài test
                    </Button>
                    <Button onClick={() => router.push(`/flashcard/topic?mode=${EFlashCardMode.TEST}`)}>
                        Quay về danh sách chủ đề
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default TopicResultPage;
