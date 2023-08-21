import { z } from "zod";

export const UserValidator = z.object({
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(30).max(1000),
  profile_photo: z.string().url().nonempty(),
});

export type UserSchemaType = z.infer<typeof UserValidator>;
