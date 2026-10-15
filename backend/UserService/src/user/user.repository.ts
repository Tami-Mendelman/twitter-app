import { UserModel } from "../models.js";
import type { User } from "@twitter-app/shared/type/user.types.js";

export const createUser = async (user: User) =>
    UserModel.create(user);

export const getAllUsers = async () =>
    UserModel.find().lean();

export const getUserById = async (userId: string) =>
    UserModel.findById(userId).lean();
