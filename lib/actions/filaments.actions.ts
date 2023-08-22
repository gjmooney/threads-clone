"use server";

import { revalidatePath } from "next/cache";
import Filament from "../models/filament.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface FilamentActionParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createFilament({
  text,
  author,
  path,
  communityId,
}: FilamentActionParams) {
  try {
    connectToDb();

    const createdFilament = await Filament.create({
      text,
      author,
      communityId: null,
    });

    // Update user
    await User.findByIdAndUpdate(author, {
      $push: { filaments: createdFilament._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating filament ${error.message}`);
  }
}
