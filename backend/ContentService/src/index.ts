import mongoose from "mongoose";
import { config } from "./config.js";
import { app } from "./router.js";

const startService = async (): Promise<void> => {
    await mongoose.connect(config.mongodbUri);

    const server = app.listen(config.port, handleListening);
    server.on("error", handleServerError);
};

const handleListening = (): void => {
    console.log(`ContentService listening on port ${config.port}`);
};

const handleServerError = (error: Error): void => {
    console.error("ContentService failed to start:", error);
    process.exitCode = 1;
};

const handleStartupError = (error: unknown): void => {
    console.error("ContentService startup failed:", error);
    process.exitCode = 1;
};

startService().catch(handleStartupError);
