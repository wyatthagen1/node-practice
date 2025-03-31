import { z } from "zod";


export const userSchema = z.object({
    birthdate: z.string({message:"Birthdate must be a string"})
                .date(),
    name: z.string({message:"Name must be a string"})
            .trim()
            .min(1, {message: "Name cannot be empty"})
            .toLowerCase()
            .regex(/^[a-z ]+$/,{message:"Name must contain only letters"}),
    email: z.string()
            .trim()
            .email("Email must contain correct characters"),
    age: z.coerce.number()
            .optional(),
    bio: z.string()
            .max(200)
            .optional()
})

export interface userContext {
    user: user
}

export type user = z.infer<typeof userSchema>