import { connect } from "mongoose";
import { config } from "./config.js";

export const connectDB = async (): Promise<void> => {
    await connect(config.mongodbUri);
};