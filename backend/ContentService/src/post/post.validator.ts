import Joi from "joi";
import { MAX_TEXT_LENGTH } from "@libs/consts/post.consts.js";
import { joiMongoId } from "@libs/validation/joi.helpers.js";

const mediaSchema = Joi.string().uri({
    scheme: ["http", "https"],
});

const emptyObjectSchema = Joi.object({});

export const canGetAll = Joi.object({
    body: emptyObjectSchema,
    params: emptyObjectSchema,
    query: emptyObjectSchema,
});

export const canCreate = Joi.object({
    body: Joi.object({
        userId: joiMongoId().required(),
        name: Joi.string().trim().min(1).required(),
        text: Joi.string().max(MAX_TEXT_LENGTH).required(),
        media: mediaSchema.optional(),
    }).required(),
    params: emptyObjectSchema,
    query: emptyObjectSchema,
});

export const canUpdate = Joi.object({
    body: Joi.object({
        name: Joi.string().trim().min(1),
        text: Joi.string().max(MAX_TEXT_LENGTH),
        media: mediaSchema,
    })
        .min(1)
        .required(),
    params: Joi.object({
        id: joiMongoId().required(),
    }).required(),
    query: emptyObjectSchema,
});

export const canGetById = Joi.object({
    body: emptyObjectSchema,
    params: Joi.object({
        id: joiMongoId().required(),
    }).required(),
    query: emptyObjectSchema,
});

export const canDelete = Joi.object({
    body: emptyObjectSchema,
    params: Joi.object({
        id: joiMongoId().required(),
    }).required(),
    query: emptyObjectSchema,
});
