import { z } from 'zod';

export const validationSchema = z.object({
    content: z.string()
            .min(1, "Content is required"),
})

export type LoginFormData = z.infer<typeof validationSchema>;