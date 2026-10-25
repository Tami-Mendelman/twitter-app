import express from "express";
import { connect } from "mongoose";
import type { InitAppOptions } from "../types/app.type.js";

export const initApp = async ({
    appRouter,
    mongodbUri,
    port,
    serviceName,
}: InitAppOptions): Promise<boolean> => {
    try {
        await connect(mongodbUri);
    } catch (error) {
        console.error(`${serviceName} startup failed:`, error);
        process.exitCode = 1;
        return false;
    }

    const app = express();
    app.use(express.json());
    app.use(appRouter);

    const server = app.listen(port, () => {
        console.log(`${serviceName} listening on port ${port}`);
    });
    server.on("error", (error: Error) => {
        console.error(`${serviceName} failed to start:`, error);
        process.exitCode = 1;
    });

    return true;
};
