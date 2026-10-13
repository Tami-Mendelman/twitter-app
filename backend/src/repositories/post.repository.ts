import { PostModel } from "../models/post.model.js";
import type { PostFields } from "../types/models.types.js";
import type { Types } from "mongoose";

export const createPost = async (post: PostFields) =>
    PostModel.create(post);

export const getAllPosts = async () =>
    PostModel.find().sort({ createdAt: -1 }).lean();

export const getPostById = async (postId: string) =>
    PostModel.findById(postId).lean();

export const updatePost = async (
    postId: string,
    changes: Partial<Pick<PostFields, "name" | "text" | "media">>,
) =>
    PostModel.findByIdAndUpdate(
        postId,
        { $set: changes },
        { new: true, runValidators: true },
    ).lean();

export const deletePost = async (postId: string) =>
    PostModel.findByIdAndDelete(postId).lean();

