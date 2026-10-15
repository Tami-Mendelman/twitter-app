import express from "express";
import { errorController } from "./error.controller.js";
import { notFoundController } from "./not-found.controller.js";
import { rpcServer } from "./rpc.server.js";
import { userRouter } from "./user/user.router.js";
import { authRouter } from "./auth/auth.router.js";

export const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/rpc", rpcServer.middleware());
app.use(notFoundController);
app.use(errorController);
