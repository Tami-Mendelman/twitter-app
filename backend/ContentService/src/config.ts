import { config as loadEnvironment } from "dotenv";
import { resolve } from "node:path";

loadEnvironment({
    path: [
        resolve(process.cwd(), ".env"),
        resolve(process.cwd(), "../.env"),
    ],
});

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
}

const getPort = (
    environmentVariable: string,
    defaultPort: number,
): number => {
    const configuredPort = process.env[environmentVariable];
    const port = configuredPort ? Number(configuredPort) : defaultPort;

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error(`${environmentVariable} must be a valid port number`);
    }

    return port;
};

const userServicePort = getPort("USER_SERVICE_PORT", 3001);

export const config = {
    mongodbUri,
    port: getPort("CONTENT_SERVICE_PORT", 3002),
    userServiceHost: process.env.USER_SERVICE_HOST ?? "localhost",
    userServicePort,
};
