"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Filament from "../models/filament.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface UpdateUserParams {
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

interface FetchAllUsersParams {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams) {
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

export async function fetchAllUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchAllUsersParams) {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDb();

    // Find all threads created by the user
    const userFilaments = await Filament.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childFilamentIds = userFilaments.reduce((acc, userFilament) => {
      return acc.concat(userFilament.children);
    }, []);

    // Find and return the child Filaments (replies) excluding the ones created by the same user
    const replies = await Filament.find({
      _id: { $in: childFilamentIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
