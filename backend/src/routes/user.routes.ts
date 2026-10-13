import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
} from "../controllers/user.controller.js";
import { validateRequest } from "../validators/validation.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";

export const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(createUserSchema, "body"),
    createUserController,
);

userRouter.get("/", getAllUsersController);

