import { userRepository } from "./user.repository.js";
import type { User } from "@twitter-app/shared/types/user.type.js";

export const userManager = {
    create: userRepository.create,
    getAll: userRepository.getAll,
    getById: userRepository.getById,
    getByUsername: userRepository.getByUsername,
};

export const createUserManager = userManager.create;
export const getAllUsersManager = userManager.getAll;
export const getUserByIdManager = userManager.getById;
export const getUserByUsernameManager = userManager.getByUsername;
export const getUserByIdRpcManager = (params: { userId: string }) =>
    userManager.getById(params.userId);
