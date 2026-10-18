import { userRepository } from "./user.repository.js";
import type { User } from "@twitter-app/shared/types/user.type.js";

export const userManager = {
    create: userRepository.create,
    getAll: userRepository.getAll,
    getById: userRepository.getById,
};

