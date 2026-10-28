import { postModel } from "@libs/models/post.model.js";
import type { Post } from "@libs/types/post.type.js";
import type { CreatePostPayload, UpdatePostPayload } from "@libs/types/post.type.js";

export const postRepository = {
    getAll: async (): Promise<Post[]> =>
        await postModel.find().sort({ createdAt: -1 }).lean(),

    getById: async (id: string): Promise<Post> =>
        await postModel.findById(id).orFail().lean(),

    create: async (post: CreatePostPayload): Promise<Post> =>
        await postModel.create(post),

    update: async (
        id: string,
        post: UpdatePostPayload,
    ): Promise<Post> =>
        await postModel.findByIdAndUpdate(
            id,
            { $set: post },
            { returnDocument: "after", runValidators: true },
        ).orFail().lean(),

    delete: async (id: string): Promise<Post> =>
        await postModel.findByIdAndDelete(id).orFail().lean(),
};
