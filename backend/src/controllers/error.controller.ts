
import type { ErrorRequestHandler } from "express";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import map from "lodash/fp/map.js";
import values from "lodash/fp/values.js";

type MongooseValidationError = InstanceType<
    typeof mongoose.Error.ValidationError
>;

type MongooseValidationDetail =
    MongooseValidationError["errors"][string];

const isDuplicateKeyError = (
    error: unknown,
): error is MongoServerError =>
    error instanceof MongoServerError && error.code === 11000;

const isMongooseValidationError = (
    error: unknown,
): error is MongooseValidationError =>
    error instanceof mongoose.Error.ValidationError;

const getValidationMessage = (
    error: MongooseValidationDetail,
): string => error.message;

const getValidationMessages = (
    error: MongooseValidationError,
): string[] => map(getValidationMessage, values(error.errors));

export const errorController: ErrorRequestHandler = (
    error: unknown,
    _req,
    res,
    _next,
): void => {
    if (isDuplicateKeyError(error)) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    if (isMongooseValidationError(error)) {
        res.status(400).json({
            message: "Database validation failed",
            errors: getValidationMessages(error),
        });
        return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
};