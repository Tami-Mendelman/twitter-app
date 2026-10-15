import Joi from "joi";
import { MAX_TEXT_LENGTH, OBJECT_ID_PATTERN } from "./post.consts.js";

const mediaSchema = Joi.string().uri({
    scheme: ["http", "https"],
});

export const createPostSchema = Joi.object({
    userId: Joi.string().pattern(OBJECT_ID_PATTERN).required(),
    name: Joi.string().trim().min(1).required(),
    text: Joi.string().max(MAX_TEXT_LENGTH).required(),
    media: mediaSchema.optional(),
});

export const updatePostSchema = Joi.object({
    name: Joi.string().trim().min(1),
    text: Joi.string().max(MAX_TEXT_LENGTH),
    media: mediaSchema,
})
    .min(1)
    .required();

export const postIdParamsSchema = Joi.object({
    postId: Joi.string().pattern(OBJECT_ID_PATTERN).required(),
});
