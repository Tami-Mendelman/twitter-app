import type { Router } from "express";

export type InitAppOptions = {
    appRouter: Router;
    mongodbUri: string;
    port: number;
    serviceName: string;
};
