import jayson from "jayson/promise/index.js";
import { rpcServerRequest } from "@libs/rpc/rpc.functions.js";
import { joiMongoId } from "@libs/validation/joi.helpers.js";
import { postManager } from "./post/post.manager.js";
import type { RequestParamsLike } from "jayson/promise/index.js";

const parseDeleteUserPostsParams = (
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

    throw new Error("Invalid deleteUserPosts RPC parameters");
};

export const rpcServer = new jayson.Server({
    deleteUserPosts: rpcServerRequest(
        postManager.deleteByUserId,
        parseDeleteUserPostsParams,
    ),
});
