import { connect } from "mongoose";
import { config } from "./config.js";

export const connectDB = async (): Promise<void> => {
    const { mongoUri } = config.db;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined");
    }

    await connect(mongoUri);
};