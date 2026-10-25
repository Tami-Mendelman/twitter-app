import { Router } from "express";
import { serviceInfo } from "@libs/serviceInfo.js";
import { userRouter } from "./user/user.router.js";

export const appRouter = Router();

appRouter.use(`${serviceInfo.user.api}/users`, userRouter);
appRouter.use((_req, res): void => {
    res.status(404).json({ message: "Route not found" });
});
