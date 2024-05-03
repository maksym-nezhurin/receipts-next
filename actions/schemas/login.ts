import { z } from "zod";
export const schemaLogin = z.object({
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});