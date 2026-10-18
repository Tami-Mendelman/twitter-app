import type { NextFunction, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import replace from "lodash/fp/replace.js";
import startsWith from "lodash/fp/startsWith.js";
import trim from "lodash/fp/trim.js";
import { config } from "../config.js";

type AuthenticatedLocals = {
    userId: string;
};

type AuthenticatedResponse = Response<unknown, AuthenticatedLocals>;
type TokenVerificationCallback = (
    error: VerifyErrors | null,
    decoded?: string | JwtPayload,
) => void;

const isBearerAuthorization = startsWith("Bearer ");
const removeBearerPrefix = replace(/^Bearer /, "");

const sendUnauthorized = (res: AuthenticatedResponse): void => {
    res.status(401).json({ message: "Authentication required" });
};

const continueWithAuthenticatedUser = (
    userId: string,
    res: AuthenticatedResponse,
    next: NextFunction,
): void => {
    res.locals.userId = userId;
    next();
};

const createTokenVerificationCallback = (
    res: AuthenticatedResponse,
    next: NextFunction,
): TokenVerificationCallback => {
    const handleTokenVerification: TokenVerificationCallback = (
        error,
        decoded,
    ): void => {
        const userId =
            !error &&
            typeof decoded === "object" &&
            decoded !== null &&
            typeof decoded.sub === "string"
                ? decoded.sub
                : null;

        userId
            ? continueWithAuthenticatedUser(userId, res, next)
            : sendUnauthorized(res);
    };

    return handleTokenVerification;
};

export const requireAuthentication: RequestHandler<
    Record<string, string>,
    unknown,
    unknown,
    unknown,
    AuthenticatedLocals
> = (req, res, next): void => {
    const authorization = req.header("authorization") ?? "";
    const token = isBearerAuthorization(authorization)
        ? trim(removeBearerPrefix(authorization))
        : "";

    token
        ? jwt.verify(
              token,
              config.jwtSecret,
              { algorithms: ["HS256"] },
              createTokenVerificationCallback(res, next),
          )
        : sendUnauthorized(res);
};

export type { AuthenticatedLocals };
