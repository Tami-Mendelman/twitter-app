import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import { serviceInfo } from "@libs/server/serviceInfo.js";

loadEnv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

export const config = {
    db: {
        mongoUri: MONGODB_URI,
    },
    server: {
        port: serviceInfo.user.local.port,
    },
    rpc: {
        port: serviceInfo.user.local.rpcPort,
    },
};