import Joi from "joi";
import { OBJECT_ID_PATTERN } from "./user.consts.js";

export const createUserSchema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    displayName: Joi.string().trim().min(1).required(),
});

export const userIdSchema = Joi.object({
    userId: Joi.string().pattern(OBJECT_ID_PATTERN).required(),
});
