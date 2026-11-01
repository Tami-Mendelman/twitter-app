import { initApp } from "@libs/server/init.js";
import { serviceInfo } from "@libs/server/serviceInfo.js";
import { config } from "./config.js";
import { appRouter } from "./router.js";
import { rpcServer } from "./rpc.server.js";

const onRpcServerListening = (): void => {
    console.log(
        `${serviceInfo.content.name} RPC listening on port ${config.rpc.port}`,
    );
};

const onRpcServerError = (error: Error): void => {
    console.error(`${serviceInfo.content.name} RPC failed to start:`, error);
    process.exitCode = 1;
};

const startServices = async (): Promise<void> => {
    const started = await initApp({
        appRouter,
        mongodbUri: config.db.mongoUri,
        port: config.server.port,
        serviceName: serviceInfo.content.name,
    });

    if (!started) return;

    const server = rpcServer.http();
    server.listen(config.rpc.port, onRpcServerListening);
    server.on("error", onRpcServerError);
};

await startServices();
