import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    displayName: Joi.string().trim().min(1).required(),
});

