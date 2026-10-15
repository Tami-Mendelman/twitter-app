import { Router } from "express";
import { validateRequest } from "../validation.middleware.js";
import {
    getCurrentUserController,
    loginController,
    registerController,
} from "./auth.controller.js";
import { requireAuthentication } from "./auth.middleware.js";
import { loginSchema, registerSchema } from "./auth.validator.js";

export const authRouter = Router();

authRouter.post(
    "/register",
    validateRequest(registerSchema, "body"),
    registerController,
);

authRouter.post(
    "/login",
    validateRequest(loginSchema, "body"),
    loginController,
);

authRouter.get("/me", requireAuthentication, getCurrentUserController);
