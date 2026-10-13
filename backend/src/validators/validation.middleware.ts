
import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import type { ObjectSchema, ValidationError } from "joi";
import map from "lodash/fp/map.js";

const getValidationMessage = (
    detail: ValidationError["details"][number],
): string => detail.message;

const sendValidationError = (
    res: Response,
    error: ValidationError,
): void => {
    const errors = map(getValidationMessage, error.details);

    res.status(400).json({
        message: "Validation failed",
        errors,
    });
};

const continueWithValidatedRequest = (
    req: Request,
    property: "body" | "params",
    value: unknown,
    next: NextFunction,
): void => {
    req[property] = value;
    next();
};

const handleValidationResult = (
    error: ValidationError | undefined,
    value: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
    property: "body" | "params",
): void =>
    error
        ? sendValidationError(res, error)
        : continueWithValidatedRequest(req, property, value, next);

export const validateRequest = (
    schema: ObjectSchema,
    property: "body" | "params",
): RequestHandler => {
    const handleRequest: RequestHandler = (req, res, next): void => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            convert: true,
        });

        handleValidationResult(
            error,
            value,
            req,
            res,
            next,
            property,
        );
    };

    return handleRequest;
};