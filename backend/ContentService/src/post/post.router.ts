import { Router } from "express";
import { postController } from "./post.controller.js";
import { validateRequest } from "@twitter-app/shared/validation.middleware.js";
import {
    canCreate,
    canDelete,
    canGetAll,
    canGetById,
    canUpdate,
    canUpdateParams,
} from "./post.validator.js";

export const postRouter = Router();

postRouter.get("/", validateRequest(canGetAll), postController.getAll);

postRouter.get(
    "/:id",
    validateRequest(canGetById, "params"),
    postController.getById,
);

postRouter.post(
    "/",
    validateRequest(canCreate, "body"),
    postController.create,
);

postRouter.patch(
    "/:id",
    validateRequest(canUpdateParams, "params"),
    validateRequest(canUpdate, "body"),
    postController.update,
);

postRouter.delete(
    "/:id",
    validateRequest(canDelete, "params"),
    postController.delete,
);
