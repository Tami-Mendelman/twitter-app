import { config as loadEnvironment } from "dotenv";
import { fileURLToPath } from "node:url";
import {
    DEFAULT_USER_SERVICE_PORT,
    MAX_PORT,
} from "@twitter-app/shared/constants/network.constants.js";
import isInteger from "lodash/fp/isInteger.js";

loadEnvironment({
    path: fileURLToPath(new URL("../../.env", import.meta.url)),
});

const mongodbUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
}

if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
}

const getPort = (
    environmentVariable: string,
    defaultPort: number,
): number => {
    const configuredPort = process.env[environmentVariable];
    const port = configuredPort ? Number(configuredPort) : defaultPort;

    if (!isInteger(port) || port < 1 || port > MAX_PORT) {
        throw new Error(`${environmentVariable} must be a valid port number`);
    }

    return port;
};

export const config = {
    mongodbUri,
    jwtSecret,
    port: getPort("USER_SERVICE_PORT", DEFAULT_USER_SERVICE_PORT),
};
