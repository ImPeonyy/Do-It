import { EFlashCardMode } from "@/src/components/pages/flashcard";

const vocabularyQueryKey = {
    all: ["vocabulary"] as const,
    topics: (page?: number, limit?: number) => [...vocabularyQueryKey.all, "topics", page ?? 1, limit ?? 6] as const,
    vocabularies: (topicId: number, type: EFlashCardMode) => [...vocabularyQueryKey.all, "vocabularies", topicId, type] as const,
    randomTopics: () => [...vocabularyQueryKey.all, "randomTopics"] as const,
};

export default vocabularyQueryKey;
