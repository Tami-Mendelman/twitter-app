import type { Request, Response } from "express";
import { postManager } from "./post.manager.js";

type PostResult = Awaited<ReturnType<typeof postManager.getById>>;

const sendPostResponse = (res: Response, post: PostResult): void =>
    post
        ? void res.status(200).json(post)
        : void res.status(404).json({ message: "Post not found" });

export const postController = {
    getAll: async (
        _req: Request,
        res: Response,
    ): Promise<void> => {
        res.status(200).json(await postManager.getAll());
    },

    getById: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        sendPostResponse(res, await postManager.getById(req.params.id as string));
    },

    create: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        res.status(201).json(await postManager.create(req.body));
    },

    update: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        sendPostResponse(
            res,
            await postManager.update(req.params.id as string, req.body),
        );
    },

    delete: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        sendPostResponse(res, await postManager.delete(req.params.id as string));
    },
};
