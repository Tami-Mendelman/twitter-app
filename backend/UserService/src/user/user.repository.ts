import { userModel } from "@libs/models/user.model.js";
import type { User } from "@libs/types/user.type.js";

export const userRepository = {
    create: async (user: User): Promise<User> =>
        await userModel.create(user),

    getAll: async (): Promise<User[]> =>
        await userModel.find().lean(),

    getById: async (id: string): Promise<User> =>
        await userModel.findById(id).orFail().lean(),
};