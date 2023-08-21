"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface UserActionProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded: boolean;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  onboarded,
  path,
}: UserActionProps) {
  connectToDb();

  try {
    await User.findOneAndUpdate(
      //find
      { id: userId },

      //update
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true },
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
