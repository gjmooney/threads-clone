import { z } from "zod";

export const FilamentValidator = z.object({
  filament: z.string().min(3),
  accountId: z.string(),
});

// because comments are also filaments
export const CommentValidator = z.object({
  filament: z.string().min(3),
});

export type FilamentSchemaType = z.infer<typeof FilamentValidator>;
export type CommentSchemaType = z.infer<typeof CommentValidator>;
