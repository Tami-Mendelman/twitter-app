import { UserModel } from "../models/user.model.js";
import type { UserFields } from "../types/models.types.js";

export const createUser = async (user: UserFields) =>
UserModel.create(user);

export const getAllUsers = async () =>
UserModel.find().lean();

export const getUserById = async (userId: string) =>
UserModel.findById(userId).lean();


