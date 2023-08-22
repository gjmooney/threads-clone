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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDb();

    // Calculate the number of post to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch top level filaments
    const postsQuery = Filament.find({
      parentId: {
        $in: [null, undefined],
      },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostCount = await Filament.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
}

export async function fetchFilamentById(id: string) {
  connectToDb();

  try {
    const filament = await Filament.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Filament, // The model of the nested children (assuming it's the same "Filament" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return filament;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}
