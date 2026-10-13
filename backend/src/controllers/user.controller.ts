
import type { RequestHandler } from "express";
import {
    createUserManager,
    getAllUsersManager,
} from "../managers/user.manager.js";
import type { UserFields } from "../types/models.types.js";

type CreateUserHandler = RequestHandler<
    Record<string, string>,
    unknown,
    UserFields
>;

const createUser: CreateUserHandler = async (req, res): Promise<void> => {
    const user = await createUserManager(req.body);
    res.status(201).json(user);
};

const getAllUsers: RequestHandler = async (_req, res): Promise<void> => {
    const users = await getAllUsersManager();
    res.status(200).json(users);
};

export const createUserController = createUser;
export const getAllUsersController = getAllUsers;