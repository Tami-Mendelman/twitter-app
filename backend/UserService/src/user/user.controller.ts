import type { RequestHandler } from "express";
import { userManager } from "./user.manager.js";
import type { User } from "@twitter-app/shared/types/user.type.js";

type CreateUserHandler = RequestHandler<
    Record<string, string>,
    unknown,
    User
>;

const createUser: CreateUserHandler = async (req, res): Promise<void> => {
    const user = await userManager.create(req.body);
    res.status(201).json(user);
};

const getAllUsers: RequestHandler = async (_req, res): Promise<void> => {
    const users = await userManager.getAll();
    res.status(200).json(users);
};

const getUserById: RequestHandler<{ userId: string }> = async (
    req,
    res,
): Promise<void> => {
    const user = await userManager.getById(req.params.userId);

    user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
};

export const createUserController = createUser;
export const getAllUsersController = getAllUsers;
export const getUserByIdController = getUserById;
