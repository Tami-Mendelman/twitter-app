import type { Request, Response } from "express";
import type { UpdatePostPayload } from "@libs/types/post.type.js";
import { postManager } from "./post.manager.js";

export const postController = {
    getAll: async (
        _req: Request,
        res: Response,
    ): Promise<void> => {
        res.status(200).json(await postManager.getAll());
    },

    getById: async (
        req: Request<{ id: string }>,
        res: Response,
    ): Promise<void> => {
        res.status(200).json(await postManager.getById(req.params.id));
    },

    create: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        res.status(201).json(await postManager.create(req.body));
    },

    update: async (
        req: Request<{ id: string }, unknown, UpdatePostPayload>,
        res: Response,
    ): Promise<void> => {
        res.status(200).json(
            await postManager.update(req.params.id, req.body),
        );
    },

    delete: async (
        req: Request<{ id: string }>,
        res: Response,
    ): Promise<void> => {
        res.status(200).json(await postManager.delete(req.params.id));
    },
};
