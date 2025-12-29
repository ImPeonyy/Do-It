import { z } from "zod";

export const topicValidation = z.object({
    name: z.string().min(1, { message: "Topic name is a required field" }),
    type: z.string().min(1, { message: "Topic type is a required field" }),
    description: z.string().min(1, { message: "Topic description is a required field" }),
});

export const vocabularyValidation = z.object({
    word: z.string().min(1, { message: "Word is a required field" }),
    partOfSpeech: z.string().min(1, { message: "Part of speech is a required field" }),
    meaning: z.string().min(1, { message: "Meaning is a required field" }),
});