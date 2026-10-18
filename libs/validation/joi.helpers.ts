import joi from "joi";

export const joiMongoId = () =>
    joi
        .string()
        .regex(/^[\dA-Fa-f]{24}$/u)
        .message("value is not a valid mongoId");
