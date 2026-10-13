
import express from "express";
import { errorController } from "./controllers/error.controller.js";
import { postRouter } from "./routes/post.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { notFoundController } from "./controllers/not-found.controller.js";

export const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.use(notFoundController);

app.use(errorController);