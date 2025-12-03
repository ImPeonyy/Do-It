import { z } from "zod";

export const formValidation = z.object({
    answer: z.string().min(1, { message: "This is a required field" })
    .max(10, { message: "This is a maximum length of 10 characters" }),
});