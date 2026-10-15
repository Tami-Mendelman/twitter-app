import { connect } from "mongoose";
import { config } from "./config.js";

export const connectDB = async (): Promise<boolean> => {
    const { mongoUri } = config.db;

    if (!mongoUri) {
        return false;
    }

    await connect(mongoUri);
    return true;
};