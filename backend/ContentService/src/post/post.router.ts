import { Router } from "express";
import {
    createPostController,
    deletePostController,
    getAllPostsController,
    getPostByIdController,
    updatePostController,
} from "./post.controller.js";
import { validateRequest } from "../validation.middleware.js";
import {
    createPostSchema,
    postIdParamsSchema,
    updatePostSchema,
} from "./post.validator.js";

export const postRouter = Router();

postRouter.post(
    "/",
    validateRequest(createPostSchema, "body"),
    createPostController,
);

postRouter.get("/", getAllPostsController);

postRouter.get(
    "/:postId",
    validateRequest(postIdParamsSchema, "params"),
    getPostByIdController,
);

postRouter.patch(
    "/:postId",
    validateRequest(postIdParamsSchema, "params"),
    validateRequest(updatePostSchema, "body"),
    updatePostController,
);

postRouter.delete(
    "/:postId",
    validateRequest(postIdParamsSchema, "params"),
    deletePostController,
);
