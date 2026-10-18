import express, { type Router } from "express";
import type { Mongoose } from "mongoose";

type InitAppOptions = {
    appRouter: Router;
    mongodbUri: string;
    mongoose: Mongoose;
    port: number;
    serviceName: string;
};

export const initApp = async ({
    appRouter,
    mongodbUri,
    mongoose,
    port,
    serviceName,
}: InitAppOptions): Promise<void> => {
    try {
        await mongoose.connect(mongodbUri);
    } catch (error) {
        console.error(`${serviceName} startup failed:`, error);
        process.exitCode = 1;
        return;
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
};
