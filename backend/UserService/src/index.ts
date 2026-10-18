import { initApp } from "@twitter-app/shared/app.js";
import { config } from "./config.js";
import { appRouter } from "./router.js";

void initApp({
    appRouter,
    mongodbUri: config.mongodbUri,
    port: config.port,
    serviceName: "UserService",
});
