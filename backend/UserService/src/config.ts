import { config as loadEnvironment } from "dotenv";
import { resolve } from "node:path";

loadEnvironment({
    path: [
        resolve(process.cwd(), ".env"),
        resolve(process.cwd(), "../.env"),
    ],
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

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error(`${environmentVariable} must be a valid port number`);
    }

    return port;
};

export const config = {
    mongodbUri,
    jwtSecret,
    port: getPort("USER_SERVICE_PORT", 3001),
};
