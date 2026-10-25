import isNil from "lodash/fp/isNil.js";
import { throwNotFoundError } from "@libs/errors/error.helpers.js";
import { postRepository } from "./post.repository.js";
import { userService } from "../rpc.client.js";
import type { CreatePostPayload } from "./post.types.js";

export const postManager = {
    getAll: postRepository.getAll,

    getById: postRepository.getById,

    create: async (
        post: CreatePostPayload,
    ): Promise<Awaited<ReturnType<typeof postRepository.create>>> => {
        const user = await userService.getUserById(post.userId);

        if (isNil(user)) {
            throwNotFoundError("User");
        }

        return await postRepository.create(post);
    },

    update: postRepository.update,

    delete: postRepository.delete,
};
