import type { RequestHandler } from "express";

export const notFoundController: RequestHandler = (_req, res): void => {
    res.status(404).json({ message: "Route not found" });
};