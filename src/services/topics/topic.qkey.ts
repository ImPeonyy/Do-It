import { EFlashCardMode } from "@/src/components/pages/flashcard";

const topicQueryKey = {
    all: ["topic"] as const,
    topics: (page?: number, limit?: number) => [...topicQueryKey.all, "topics", page ?? 1, limit ?? 6] as const,
    topic: (topicId: number) => [...topicQueryKey.all, "topic", topicId] as const,
    randomTopics: () => [...topicQueryKey.all, "randomTopics"] as const,
    topicDetail: (topicId: number, type: EFlashCardMode) => [...topicQueryKey.all, "topicDetail", topicId, type] as const,
};

export default topicQueryKey;