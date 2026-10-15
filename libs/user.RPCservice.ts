import jayson from "jayson/promise/index.js";
import { rpcClientRequest } from "./rpc.functions.js";

export type UserRpcResult = {
    _id: string;
} | null;

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

    const getUserById = (userId: string) =>
        rpcClientRequest(
            rpcClient,
            "users.getById",
            { userId },
            parseUserRpcResult,
        );

    return { getUserById };
};
