import {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
} from "./user.repository.js";
import type { User } from "@twitter-app/shared/type/user.types.js";

export const createUserManager = async (user: User) =>
    createUser(user);

export const getAllUsersManager = async () =>
    getAllUsers();

export const getUserByIdManager = async (userId: string) =>
    getUserById(userId);

export const getUserByUsernameManager = async (username: string) =>
    getUserByUsername(username);

export const getUserByIdRpcManager = async (
    params: { userId: string },
) => getUserByIdManager(params.userId);
