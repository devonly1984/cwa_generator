import {z} from 'zod';


export const projectSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
})

export type ProjectSchema = z.infer<typeof projectSchema>;