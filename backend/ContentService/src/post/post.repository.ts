import mongoose, { type HydratedDocument } from "mongoose";
import { createPostModel } from "@twitter-app/shared/models/post.model.js";
import type {
    CreatePostPayload,
    Post,
    UpdatePostPayload,
} from "@twitter-app/shared/types/post.type.js";

const PostModel = createPostModel(mongoose);

type CreatedPost = HydratedDocument<Post>;
type LeanPost = Awaited<
    ReturnType<ReturnType<typeof PostModel.findById>["lean"]>
>;
type LeanPosts = Awaited<
    ReturnType<ReturnType<typeof PostModel.find>["lean"]>
>;

export const postRepository = {
    getAll: async (): Promise<LeanPosts> =>
        await PostModel.find().sort({ createdAt: -1 }).lean(),
    getById: async (postId: string): Promise<LeanPost> =>
        await PostModel.findById(postId).lean(),
    create: async (post: CreatePostPayload): Promise<CreatedPost> =>
        await PostModel.create(post),
    update: async (
        postId: string,
        changes: UpdatePostPayload,
    ): Promise<LeanPost> =>
        await PostModel.findByIdAndUpdate(
            postId,
            { $set: changes },
            { returnDocument: "after", runValidators: true },
        ).lean(),
    delete: async (postId: string): Promise<LeanPost> =>
        await PostModel.findByIdAndDelete(postId).lean(),
};
