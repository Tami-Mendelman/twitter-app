import jayson from "jayson/promise/index.js";
import { rpcServerRequest } from "@twitter-app/shared/rpc.functions.js";
import { joiMongoId } from "@twitter-app/shared/validation/joi.helpers.js";
import { userManager } from "./user/user.manager.js";
import type { RequestParamsLike } from "jayson/promise/index.js";

const parseGetUserByIdParams = (
    params: RequestParamsLike,
): [string] => {
    if (
        typeof params === "object" &&
        params !== null &&
        !Array.isArray(params) &&
        "userId" in params &&
        typeof params.userId === "string" &&
        !joiMongoId().validate(params.userId).error
    ) {
        return [params.userId];
    }

    throw new Error("Invalid getById RPC parameters");
};

export const rpcServer = new jayson.Server({
    getById: rpcServerRequest(
        userManager.getById,
        parseGetUserByIdParams,
    ),
});
