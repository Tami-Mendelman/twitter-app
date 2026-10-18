import { Router } from "express";
import { postRouter } from "./post/post.router.js";

export const appRouter = Router();

appRouter.use("/api/content-service/posts", postRouter);
appRouter.use((_req, res): void => {
    res.status(404).json({ message: "Route not found" });
});
