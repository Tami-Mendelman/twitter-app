import type { RequestHandler } from "express";
import type { User } from "@twitter-app/shared/types/user.type.js";
import {
    loginManager,
    registerManager,
} from "./auth.manager.js";
import type { AuthenticatedLocals } from "./auth.middleware.js";

type RegisterHandler = RequestHandler<
    Record<string, string>,
    unknown,
    User
>;

type LoginHandler = RequestHandler<
    Record<string, string>,
    unknown,
    Pick<User, "username">
>;

const register: RegisterHandler = async (req, res): Promise<void> => {
    const session = await registerManager(req.body);
    res.status(201).json(session);
};

const login: LoginHandler = async (req, res): Promise<void> => {
    const session = await loginManager(req.body);
    session
        ? res.status(200).json(session)
        : res.status(401).json({ message: "Invalid username" });
};

const getCurrentUser: RequestHandler<
    Record<string, string>,
    unknown,
    unknown,
    unknown,
    AuthenticatedLocals
> = async (_req, res): Promise<void> => {
    res.status(200).json(res.locals.user);
};

export const registerController = register;
export const loginController = login;
export const getCurrentUserController = getCurrentUser;
