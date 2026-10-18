import mongoose from "mongoose";
import { createUserModel } from "@twitter-app/shared/models/user.model.js";
import type { User } from "@twitter-app/shared/types/user.type.js";

const UserModel = createUserModel(mongoose);


export const userRepository = {
    create: async (user: User) =>
        UserModel.create(user),
    getAll: async () =>
        UserModel.find().lean(),
    getById: async (userId: string) =>
        UserModel.findById(userId).lean(),
    getByUsername: async (username: string) =>
        UserModel.findOne({ username }).lean(),
};

