import jayson from "jayson/promise/index.js";
import { rpcServerRequest } from "@twitter-app/shared/rpc.functions.js";
import { getUserByIdRpcManager } from "./user/user.manager.js";
import { OBJECT_ID_PATTERN } from "./user/user.consts.js";
import type { RequestParamsLike } from "jayson/promise/index.js";

type GetUserByIdParams = {
    userId: string;
};

const parseGetUserByIdParams = (
    params: RequestParamsLike,
): [GetUserByIdParams] => {
    if (
        typeof params === "object" &&
        params !== null &&
        !Array.isArray(params) &&
        "userId" in params &&
        typeof params.userId === "string" &&
        OBJECT_ID_PATTERN.test(params.userId)
    ) {
        return [{ userId: params.userId }];
    }

    throw new Error("Invalid users.getById RPC parameters");
};

export const rpcServer = new jayson.Server({
    "users.getById": rpcServerRequest(
        getUserByIdRpcManager,
        parseGetUserByIdParams,
    ),
});
