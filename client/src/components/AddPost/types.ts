import { z } from 'zod';

export const validationSchema = z.object({
    name: z.string()
            .min(1, "Name is required"),
    content: z.string()
            .min(1, "Content is required"),
})

export type LoginFormData = z.infer<typeof validationSchema>;