import {
createUser,
getAllUsers,
getUserById,
} from "../repositories/user.repository.js";
import type { UserFields } from "../types/models.types.js";

export const createUserManager = async (user: UserFields) =>
createUser(user);

export const getAllUsersManager = async () =>
getAllUsers();

export const getUserByIdManager = async (userId: string) =>
getUserById(userId);


