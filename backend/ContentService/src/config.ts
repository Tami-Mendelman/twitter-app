import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import { serviceInfo } from "@libs/server/serviceInfo.js";

loadEnv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const {
    MONGODB_URI,
    RPC_HOSTNAME = "localhost",
} = process.env;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

export const config = {
    db: {
        mongoUri: MONGODB_URI,
    },
    server: {
        port: serviceInfo.content.local.port,
    },
    rpc: {
        userServiceHost: RPC_HOSTNAME,
        userServicePort: serviceInfo.user.local.rpcPort,
    },
};