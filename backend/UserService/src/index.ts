import { initApp } from "@libs/server/init.js";
import { serviceInfo } from "@libs/server/serviceInfo.js";
import { config } from "./config.js";
import { appRouter } from "./router.js";
import { rpcServer } from "./rpc.server.js";

initApp({
    appRouter,
    mongodbUri: config.db.mongoUri,
    port: config.server.port,
    serviceName: serviceInfo.user.name,
}).then((started) => {
    if (!started) return;

    const server = rpcServer.http();
    server.listen(config.rpc.port, () => {
        console.log(
            `${serviceInfo.user.name} RPC listening on port ${config.rpc.port}`,
        );
    });
    server.on("error", (error: Error) => {
        console.error(`${serviceInfo.user.name} RPC failed to start:`, error);
        process.exitCode = 1;
    });
});