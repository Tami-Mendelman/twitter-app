import isNil from "lodash/fp/isNil.js";
import { throwNotFoundError } from "@libs/errors/error.helpers.js";
import type { Post } from "@libs/types/post.type.js";
import { postRepository } from "./post.repository.js";
import { userService } from "../rpc.client.js";
import type { CreatePostPayload } from "@libs/types/post.type.js";

export const postManager = {
    getAll: postRepository.getAll,

    getById: postRepository.getById,

    create: async (
        post: CreatePostPayload,
    ): Promise<Post> => {
        const user = await userService.getUserById(post.userId.toString());

        if (isNil(user)) {
            throwNotFoundError("User");
        }

        return await postRepository.create(post);
    },

    update: postRepository.update,

    delete: postRepository.delete,
};
