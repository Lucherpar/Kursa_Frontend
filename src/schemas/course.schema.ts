import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  description: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
