import { Router } from "express";
import { postController } from "./post.controller.js";
import { validateRequest } from "@libs/validation/validation.middleware.js";
import {
    canCreate,
    canDelete,
    canGetAll,
    canGetById,
    canUpdate,
} from "./post.validator.js";

export const postRouter = Router();

postRouter.get("/", validateRequest(canGetAll), postController.getAll);

postRouter.get(
    "/:id",
    validateRequest(canGetById),
    postController.getById,
);

postRouter.post(
    "/",
    validateRequest(canCreate),
    postController.create,
);

postRouter.patch(
    "/:id",
    validateRequest(canUpdate),
    postController.update,
);

postRouter.delete(
    "/:id",
    validateRequest(canDelete),
    postController.delete,
);
