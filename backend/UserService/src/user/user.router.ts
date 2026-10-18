import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
} from "./user.controller.js";
import { validateRequest } from "@twitter-app/shared/validation.middleware.js";
import { canCreate, canGetAll, canGetById } from "./user.validator.js";

export const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(canCreate, "body"),
    createUserController,
);

userRouter.get("/", validateRequest(canGetAll), getAllUsersController);

userRouter.get(
    "/:id",
    validateRequest(canGetById, "params"),
    getUserByIdController,
);
