import jayson from "jayson/promise/index.js";
import { rpcClientRequest } from "../rpc.functions.js";
import type { UserRpcResult } from "./user.type.js";

const parseUserRpcResult = (result: unknown): UserRpcResult => {
    if (result === null) {
        return null;
    }

    if (
        typeof result === "object" &&
        result !== null &&
        "_id" in result &&
        typeof result._id === "string"
    ) {
        return { _id: result._id };
    }

    throw new Error("UserService RPC returned an invalid user result");
};

export const userRPCService = (hostname: string, port: number) => {
    const rpcClient = jayson.Client.http({
        hostname,
        port,
        path: "/rpc",
    });

    return {
        getUserById: (userId: string): Promise<UserRpcResult> =>
            rpcClientRequest(
                rpcClient,
                "getById",
                { userId },
                parseUserRpcResult,
            ),
    };
};
