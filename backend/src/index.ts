import { connectDB } from "./config/database.js";

const startApp = async (): Promise<void> => {
    if (await connectDB()) {
        console.log("MongoDB connected successfully");
    }
};

startApp().catch((error: unknown) => {
    console.error("Application startup failed:", error);
    process.exitCode = 1;
});