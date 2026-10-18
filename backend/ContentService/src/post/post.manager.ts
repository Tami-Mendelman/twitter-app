import isNil from "lodash/fp/isNil.js";
import { postRepository } from "./post.repository.js";
import { userService } from "../rpc.client.js";
import type {
    CreatePostPayload,
    UpdatePostPayload,
} from "@twitter-app/shared/types/post.type.js";

class NotFoundError extends Error {
    readonly status = 404;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export const postManager = {
    getAll: postRepository.getAll,

    getById: postRepository.getById,

    create: async (post: CreatePostPayload, userId: string) => {
        const user = await userService.getUserById(userId);

        if (isNil(user)) {
            throw new NotFoundError("User not found");
        }

        return await postRepository.create({ ...post, userId });
    },

    update: (
        postId: string,
        userId: string,
        changes: UpdatePostPayload,
    ) => postRepository.update(postId, userId, changes),

    delete: (postId: string, userId: string) =>
        postRepository.delete(postId, userId),
};
