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

export interface TestDetail extends Test {
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
    userAnswer: string | null;
}

export interface PartQuestion {
    partId: number;
    partNumber: number;
    questions: Question[];
}