import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
} from "./user.controller.js";
import { validateRequest } from "../validation.middleware.js";
import { createUserSchema, userIdSchema } from "./user.validator.js";

export const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(createUserSchema, "body"),
    createUserController,
);

userRouter.get("/", getAllUsersController);

userRouter.get(
    "/:userId",
    validateRequest(userIdSchema, "params"),
    getUserByIdController,
);
