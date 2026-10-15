import type { NextFunction, RequestHandler, Response } from "express";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import replace from "lodash/fp/replace.js";
import startsWith from "lodash/fp/startsWith.js";
import trim from "lodash/fp/trim.js";
import type { AuthenticatedUser } from "./auth.manager.js";
import {
    getTokenSubject,
    verifyToken,
} from "./auth.manager.js";
import { getUserByIdManager } from "../user/user.manager.js";

type AuthenticatedLocals = {
    user: AuthenticatedUser;
};

type AuthenticatedResponse = Response<unknown, AuthenticatedLocals>;
type TokenVerificationCallback = (
    error: VerifyErrors | null,
    decoded?: string | JwtPayload,
) => void;

const isBearerAuthorization = startsWith("Bearer ");
const removeBearerPrefix = replace(/^Bearer /, "");

const sendUnauthorized = (
    res: AuthenticatedResponse,
): void => {
    res.status(401).json({ message: "Authentication required" });
};

const continueWithAuthenticatedUser = (
    user: AuthenticatedUser,
    res: AuthenticatedResponse,
    next: NextFunction,
): void => {
    res.locals.user = user;
    next();
};

const handleAuthenticatedUser = (
    user: AuthenticatedUser | null,
    res: AuthenticatedResponse,
    next: NextFunction,
): void =>
    user
        ? continueWithAuthenticatedUser(user, res, next)
        : sendUnauthorized(res);

const loadAuthenticatedUser = async (
    subject: string,
    res: AuthenticatedResponse,
    next: NextFunction,
): Promise<void> => {
    const user = await getUserByIdManager(subject);
    handleAuthenticatedUser(user, res, next);
};

const handleTokenVerification = (
    error: VerifyErrors | null,
    decoded: string | JwtPayload | undefined,
    res: AuthenticatedResponse,
    next: NextFunction,
): void => {
    const subject = error ? null : getTokenSubject(decoded);
    subject
        ? void loadAuthenticatedUser(subject, res, next).catch(next)
        : sendUnauthorized(res);
};

const createTokenVerificationCallback = (
    res: AuthenticatedResponse,
    next: NextFunction,
): TokenVerificationCallback => {
    const verificationCallback: TokenVerificationCallback = (
        error,
        decoded,
    ): void => {
        handleTokenVerification(error, decoded, res, next);
    };

    return verificationCallback;
};

export const requireAuthentication: RequestHandler<
    Record<string, string>,
    unknown,
    unknown,
    unknown,
    AuthenticatedLocals
> = (
    req,
    res,
    next,
): void => {
    const authorization = req.header("authorization") ?? "";
    const token = isBearerAuthorization(authorization)
        ? trim(removeBearerPrefix(authorization))
        : "";

    token
        ? verifyToken(token, createTokenVerificationCallback(res, next))
        : sendUnauthorized(res);
};

export type { AuthenticatedLocals };
