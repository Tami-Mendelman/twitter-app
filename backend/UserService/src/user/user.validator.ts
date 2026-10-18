import Joi from "joi";
import { joiMongoId } from "@twitter-app/shared/validation/joi.helpers.js";

export const canGetAll = Joi.object({
    body: {},
    query: {},
    params: {},
});

export const canCreate = Joi.object({
    username: Joi.string().trim().min(1).required(),
    displayName: Joi.string().trim().min(1).required(),
});

export const canGetById = Joi.object({
    userId: joiMongoId().required(),
});
