import { initApp } from "@libs/server/init.js";
import { serviceInfo } from "@libs/server/serviceInfo.js";
import { config } from "./config.js";
import { appRouter } from "./router.js";

initApp({
    appRouter,
    mongodbUri: config.db.mongoUri,
    port: config.server.port,
    serviceName: serviceInfo.content.name,
});
