import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions, VerifyErrors } from "jsonwebtoken";
import toString from "lodash/fp/toString.js";
import { config } from "../config.js";
import {
    createUserManager,
    getUserByUsernameManager,
} from "../user/user.manager.js";
import type { User } from "@twitter-app/shared/type/user.types.js";

type RegistrationPayload = User;
type LoginPayload = Pick<User, "username">;
type AuthenticationUser = NonNullable<
    Awaited<ReturnType<typeof getUserByUsernameManager>>
>;
type TokenVerificationCallback = (
    error: VerifyErrors | null,
    decoded?: string | JwtPayload,
) => void;

const TOKEN_OPTIONS: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
};

export type AuthenticatedUser = AuthenticationUser;

export type AuthSession = {
    token: string;
    user: AuthenticationUser;
};

const createToken = (userId: string): string =>
    jwt.sign({}, config.jwtSecret, {
        ...TOKEN_OPTIONS,
        subject: userId,
    });

const createAuthSession = (user: AuthenticationUser): AuthSession => ({
    token: createToken(toString(user._id)),
    user,
});

export const registerManager = async (
    registration: RegistrationPayload,
): Promise<AuthSession> => {
    const user = await createUserManager(registration);
    return createAuthSession(user.toObject());
};

export const loginManager = async (
    credentials: LoginPayload,
): Promise<AuthSession | null> => {
    const user = await getUserByUsernameManager(credentials.username);
    return user ? createAuthSession(user) : null;
};

export const verifyToken = (
    token: string,
    callback: TokenVerificationCallback,
): void => {
    jwt.verify(
        token,
        config.jwtSecret,
        { algorithms: ["HS256"] },
        callback,
    );
};

export const getTokenSubject = (
    decoded: string | JwtPayload | undefined,
): string | null =>
    typeof decoded === "object" &&
    decoded !== null &&
    typeof decoded.sub === "string"
        ? decoded.sub
        : null;
