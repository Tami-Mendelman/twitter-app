import "dotenv/config";
import { connectDB } from "./config/database.js";

const startApp = async (): Promise<void> => {
    await connectDB();
    console.log("MongoDB connected successfully");
};

const handleStartupError = (error: unknown): void => {
    console.error("Application startup failed:", error);
    process.exitCode = 1;
};

startApp().catch(handleStartupError);