import { ChosenOption } from "@/constants/index";

export interface Test {
    id: number;
    title: string;
    description: string;
    partsProcess: number | null;
    createdAt: string;
}

export interface TestQuestion {
    id: number;
    testId: number;
    partId: number;
    passage: string | null;
    passageId: number | null;
    questionNumber: number;
    questionText: string;
    correctOption: string;
    explanation: string;
    imageUrl: string;
    audioUrl: string;
    createdAt: string;
    options: TestAnswer[]
    userAnswer: string | null
}

export interface TestAnswer {
    id: number;
    questionId: string;
    optionLabel: string;
    optionText: string;
}

export interface Part {
    partId: number;
    partNumber: number;
    partTitle: string;
    isCompleted: boolean;
}

export interface TestDetail {
    test: {
        id: number;
        title: string;
        description: string;
    };
    parts: Part[];
}

export interface Question {
    id: string;
    testId: number;
    partId: number;
    passage: string | null;
    passageId: number | null;
    questionNumber: number;
    questionText: string;
    explanation: string;
    imageUrl: string;
    audioUrl: string;
    createdAt: string;
    options: TestAnswer[];
    userAnswer: ChosenOption | null;
}

export interface PartQuestion {
    partId: number;
    partNumber: number;
    questions: Question[];
}

export interface Answer {
    chosenOption: ChosenOption;
    questionId: string;
    passageId: number | null;
}

export interface Score {
    listeningScore: number;
    readingScore: number;
    totalScore: number;
}

export interface PartResult {
    partNumber: number;
    correct: number;
    total: number;
    questions: QuestionResult[];
}

export interface QuestionResult {
    questionNumber: number;
    chosenOption: ChosenOption;
    correctOption: ChosenOption;
    isCorrect: boolean;
}

export interface ToeicTestResult {
    testTitle: string;
    score: Score;
    parts: PartResult[];
}