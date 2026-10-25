import { Router } from "express";
import { serviceInfo } from "@libs/serviceInfo.js";
import { postRouter } from "./post/post.router.js";

export const appRouter = Router();

appRouter.use(`${serviceInfo.content.api}/posts`, postRouter);
appRouter.use((_req, res): void => {
    res.status(404).json({ message: "Route not found" });
});
