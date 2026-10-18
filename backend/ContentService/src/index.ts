import mongoose from "mongoose";
import { initApp } from "@twitter-app/shared/app.js";
import { config } from "./config.js";
import { appRouter } from "./router.js";

void initApp({
    appRouter,
    mongodbUri: config.mongodbUri,
    mongoose,
    port: config.port,
    serviceName: "ContentService",
});
