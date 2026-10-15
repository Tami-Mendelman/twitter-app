import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(1).max(30).required(),
    displayName: Joi.string().trim().min(1).max(80).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().trim().min(1).max(30).required(),
});
