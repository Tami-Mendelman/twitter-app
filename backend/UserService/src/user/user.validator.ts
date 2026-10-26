import Joi from "joi";
import { joiMongoId } from "@libs/validation/joi.helpers.js";

const emptyObjectSchema = Joi.object({});

export const canGetAll = Joi.object({
    body: emptyObjectSchema,
    params: emptyObjectSchema,
    query: emptyObjectSchema,
});

export const canCreate = Joi.object({
    body: Joi.object({
        username: Joi.string().trim().min(1).required(),
        displayName: Joi.string().trim().min(1).required(),
    }).required(),
    params: emptyObjectSchema,
    query: emptyObjectSchema,
});

export const canGetById = Joi.object({
    body: emptyObjectSchema,
    params: Joi.object({
        id: joiMongoId().required(),
    }).required(),
    query: emptyObjectSchema,
});
