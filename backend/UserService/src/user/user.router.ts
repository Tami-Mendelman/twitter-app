import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "@libs/validation/validation.middleware.js";
import { canCreate, canGetAll, canGetById } from "./user.validator.js";

export const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(canCreate),
    userController.create,
);

userRouter.get("/", validateRequest(canGetAll), userController.getAll);

userRouter.get(
    "/:id",
    validateRequest(canGetById),
    userController.getById,
);
