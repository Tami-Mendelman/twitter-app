import type { RequestHandler } from "express";
import {
    createUserManager,
    getAllUsersManager,
    getUserByIdManager,
} from "./user.manager.js";
import type { User } from "@twitter-app/shared/type/user.types.js";

type CreateUserHandler = RequestHandler<
    Record<string, string>,
    unknown,
    User
>;

type UserIdHandler = RequestHandler<{ userId: string }>;

const createUser: CreateUserHandler = async (req, res): Promise<void> => {
    const user = await createUserManager(req.body);
    res.status(201).json(user);
};

const getAllUsers: RequestHandler = async (_req, res): Promise<void> => {
    const users = await getAllUsersManager();
    res.status(200).json(users);
};

const getUserById: UserIdHandler = async (req, res): Promise<void> => {
    const user = await getUserByIdManager(req.params.userId);

    user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
};

export const createUserController = createUser;
export const getAllUsersController = getAllUsers;
export const getUserByIdController = getUserById;
