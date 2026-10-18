import Joi from "joi";
import { MAX_TEXT_LENGTH } from "@twitter-app/shared/constants/post.constants.js";
import { joiMongoId } from "@twitter-app/shared/validation/joi.helpers.js";

const mediaSchema = Joi.string().uri({
    scheme: ["http", "https"],
});

export const canGetAll = Joi.object({
    body: {},
    query: {},
    params: {},
});

export const canCreate = Joi.object({
    name: Joi.string().trim().min(1).required(),
    text: Joi.string().max(MAX_TEXT_LENGTH).required(),
    media: mediaSchema.optional(),
});

export const canUpdate = Joi.object({
    name: Joi.string().trim().min(1),
    text: Joi.string().max(MAX_TEXT_LENGTH),
    media: mediaSchema,
})
    .min(1)
    .required();

export const canGetById = Joi.object({
    id: joiMongoId().required(),
});

export const canUpdateParams = Joi.object({
    id: joiMongoId().required(),
});

export const canDelete = Joi.object({
    id: joiMongoId().required(),
});
