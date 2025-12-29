export interface Vocabulary {
    id: number;
    word: string;
    pronounce: string;
    partOfSpeech: string;
    meaning?: string;
    exampleSentence?: string;
}

export interface VocabsTestAnswer {
    questionId: number;
    answer: string;
}

export interface VocabularyForm {
    word: string;
    partOfSpeech: string;
    pronounce?: string;
    meaning: string;
    exampleSentence?: string;
}

export interface CreateVocabularyRequest {
    topicId: number;
    word: string;
    partOfSpeech: string;
    pronounce?: string;
    meaning: string;
    exampleSentence?: string;
}