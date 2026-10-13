import Joi from "joi";

const OBJECT_ID_PATTERN  = /^[0-9a-fA-F]{24}$/;

const MEDIA_SCHEMA  = Joi.string().uri({
    scheme: ["http", "https"],
});

export const createPostSchema = Joi.object({
    userId: Joi.string().pattern(OBJECT_ID_PATTERN).required(),
    name: Joi.string().trim().min(1).required(),
    text: Joi.string().max(200).required(),
    media: MEDIA_SCHEMA.optional(),
});

export const updatePostSchema = Joi.object({
    name: Joi.string().trim().min(1),
    text: Joi.string().max(200),
    media: MEDIA_SCHEMA,
})
    .min(1)
    .required();

export const postIdParamsSchema = Joi.object({
    postId: Joi.string().pattern(OBJECT_ID_PATTERN).required(),
});

