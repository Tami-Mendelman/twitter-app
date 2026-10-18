import type { Request, Response } from "express";
import { postManager } from "./post.manager.js";
import type { AuthenticatedLocals } from "../auth/auth.middleware.js";
import type {
    CreatePostPayload,
    UpdatePostPayload,
} from "@twitter-app/shared/types/post.type.js";

type AuthenticatedPostResponse = Response<unknown, AuthenticatedLocals>;

export const postController = {
    sendPostResponse: (
        res: Response,
        post: Awaited<ReturnType<typeof postManager.getById>>,
    ): void =>
        post
            ? void res.status(200).json(post)
            : void res.status(404).json({ message: "Post not found" }),

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
        postController.sendPostResponse(
            res,
            await postManager.getById(req.params.id),
        );
    },

    create: async (
        req: Request<Record<string, string>, unknown, CreatePostPayload>,
        res: AuthenticatedPostResponse,
    ): Promise<void> => {
        res.status(201).json(
            await postManager.create(req.body, res.locals.userId),
        );
    },

    update: async (
        req: Request<{ id: string }, unknown, UpdatePostPayload>,
        res: AuthenticatedPostResponse,
    ): Promise<void> => {
        postController.sendPostResponse(
            res,
            await postManager.update(
                req.params.id,
                res.locals.userId,
                req.body,
            ),
        );
    },

    delete: async (
        req: Request<{ id: string }>,
        res: AuthenticatedPostResponse,
    ): Promise<void> => {
        postController.sendPostResponse(
            res,
            await postManager.delete(req.params.id, res.locals.userId),
        );
    },
};
