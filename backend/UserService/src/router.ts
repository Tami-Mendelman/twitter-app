import { Router } from "express";
import { rpcServer } from "./rpc.server.js";
import { userRouter } from "./user/user.router.js";
import { authRouter } from "./auth/auth.router.js";

export const appRouter = Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/rpc", rpcServer.middleware());
appRouter.use((_req, res): void => {
    res.status(404).json({ message: "Route not found" });
});

