import type { NextFunction, Request, RequestHandler, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import type { ObjectSchema } from "joi";
import invoke from "lodash/fp/invoke.js";
import mapValues from "lodash/fp/mapValues.js";

type RequestProperty = "body" | "params";

const sendValidationError = (
    res: Response,
    messages: string[],
): void => {
    res.status(400).json({
        message: "Validation failed",
        errors: messages,
    });
};

export const validateRequest = (
    schema: ObjectSchema,
    property?: RequestProperty,
): RequestHandler => (req: Request, res: Response, next: NextFunction): void => {
    if (property === undefined) {
        const sanitizedRequest = mongoSanitize.sanitize(
            {
                body: req.body,
                query: req.query,
                params: req.params,
            },
            { allowDots: false },
        );
        const { error } = schema.validate(sanitizedRequest, {
            abortEarly: false,
            convert: true,
        });

        if (error) {
            sendValidationError(
                res,
                error.details.map((detail) => detail.message),
            );
            return;
        }

        next();
        return;
    }

    const sanitizedValue = mongoSanitize.sanitize(req[property], {
        allowDots: false,
    });
    const { error, value } = schema.validate(sanitizedValue, {
        abortEarly: false,
        convert: true,
    });

    if (error) {
        sendValidationError(
            res,
            error.details.map((detail) => detail.message),
        );
        return;
    }

    if (property === "body") {
        req.body = value;
    } else {
        req.params = value;
    }

    next();
};

export const makeRequired = mapValues(invoke("required"));
