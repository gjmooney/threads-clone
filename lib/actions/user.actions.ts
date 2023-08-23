"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Filament from "../models/filament.model";

interface UserActionParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

type UserDocument = {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  filaments: string[];
  onBoarded: boolean;
  communities: string[];
};

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UserActionParams) {
  connectToDb();

  console.log("first");
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
        onBoarded: true,
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

export async function fetchUser(userId: string) {
  try {
    connectToDb();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDb();

    // Find all threads authored by the user with the given userId
    const filaments = await User.findOne({ id: userId }).populate({
      path: "filaments",
      model: Filament,
      populate: [
        /* {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        }, */
        {
          path: "children",
          model: Filament,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return filaments;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
