import express from "express";
import { errorController } from "./error.controller.js";
import { notFoundController } from "./not-found.controller.js";
import { postRouter } from "./post/post.router.js";

export const app = express();

app.use(express.json());
app.use("/api/posts", postRouter);
app.use(notFoundController);
app.use(errorController);
