import {
    createUser,
    getAllUsers,
    getUserById,
} from "./user.repository.js";
import type { User } from "./user.types.js";

export const createUserManager = async (user: User) =>
    createUser(user);

export const getAllUsersManager = async () =>
    getAllUsers();

export const getUserByIdManager = async (userId: string) =>
    getUserById(userId);

export const getUserByIdRpcManager = async (
    params: { userId: string },
) => getUserByIdManager(params.userId);
