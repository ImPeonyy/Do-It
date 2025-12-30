import { EFlashCardMode } from "@/src/components/pages/flashcard";

const vocabularyQueryKey = {
    all: ["vocabulary"] as const,
    vocabularies: (topicId: number, type: EFlashCardMode) => [...vocabularyQueryKey.all, "vocabularies", topicId, type] as const,
    vocabulary: (topicId: number, vocabId: number) => [...vocabularyQueryKey.all, "vocabulary", topicId, vocabId] as const,
    flashcards: (topicId: number) => [...vocabularyQueryKey.all, "flashcards", topicId] as const,
    favoriteVocab: (vocabId: number) => [...vocabularyQueryKey.all, "favorite-vocab", vocabId] as const,
};

export default vocabularyQueryKey;
