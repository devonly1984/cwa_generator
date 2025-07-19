import {z} from 'zod';


export const messageSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});



export type MessageSchema = z.infer<typeof messageSchema>;