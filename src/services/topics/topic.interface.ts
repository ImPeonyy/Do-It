import { Vocabulary } from "../vocabulary/vocabulary.interface";

export interface Topic {
    id: number;
    name: string;
    type: string;
    description: string;
    createAt: string;
}

export interface TopicDetail extends Topic {
    vocabs: Vocabulary[];
}


export interface TopicTestQuestionResult {
    id: number;
    word: string;
    pronounce: string;
    partOfSpeech: string;
    meaning: string;
    exampleSentence: string;
    userAnswer: string;
    isCorrect: boolean;
}

export interface TopicTestResultResponse {
    totalQuestions: number;
    correctCount: number;
    scoreChange: number;
    questions: TopicTestQuestionResult[];
}

export interface TopicForm {
    name: string;
    type: string;
    description: string;
}