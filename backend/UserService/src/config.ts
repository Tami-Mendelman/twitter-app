import "dotenv/config";
import {
    DEFAULT_USER_SERVICE_PORT,
    MAX_PORT,
} from "@twitter-app/shared/constants/network.constants.js";
import isInteger from "lodash/fp/isInteger.js";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
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
    mongodbUri: MONGODB_URI,
    port: getPort("USER_SERVICE_PORT", DEFAULT_USER_SERVICE_PORT),
};
