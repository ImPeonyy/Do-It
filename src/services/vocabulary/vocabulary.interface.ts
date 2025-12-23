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

export interface Vocabulary {
    id: number;
    word: string;
    pronounce: string;
    partOfSpeech: string;
    meaning?: string;
    exampleSentence?: string;
}