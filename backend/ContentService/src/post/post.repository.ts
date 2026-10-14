import { Types } from "mongoose";
import { PostModel } from "../models.js";
import type { CreatePost, PostChanges } from "./post.types.js";

export const createPost = async (post: CreatePost) =>
    PostModel.create({
        ...post,
        userId: new Types.ObjectId(post.userId),
    });

export const getAllPosts = async () =>
    PostModel.find().sort({ createdAt: -1 }).lean();

export const getPostById = async (postId: string) =>
    PostModel.findById(postId).lean();

export const updatePost = async (
    postId: string,
    changes: PostChanges,
) =>
    PostModel.findByIdAndUpdate(
        postId,
        { $set: changes },
        { returnDocument: "after", runValidators: true },
    ).lean();

export const deletePost = async (postId: string) =>
    PostModel.findByIdAndDelete(postId).lean();
