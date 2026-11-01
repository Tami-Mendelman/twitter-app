import isNil from "lodash/fp/isNil.js";
import { userRepository } from "./user.repository.js";
import { throwNotFoundError } from "@libs/errors/error.helpers.js";
import { postService } from "../rpc.client.js";

export const userManager = {
    create: userRepository.create,
    getAll: userRepository.getAll,
    getById: userRepository.getById,
    deleteUserPosts: async (username: string): Promise<number> => {
        const user = await userRepository.getByUsername(username);
        if (isNil(user)) {
            return throwNotFoundError("User");
        }

        return await postService.deleteUserPosts(user._id);
    },
};
