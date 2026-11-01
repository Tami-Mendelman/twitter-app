import jayson from "jayson/promise/index.js";
import { rpcClientRequest } from "../rpc.functions.js";

const parseDeletedCount = (result: unknown): number => {
    if (typeof result === "number" && Number.isInteger(result) && result >= 0) {
        return result;
    }

    throw new Error("ContentService RPC returned an invalid delete result");
};

export const postRpcService = (hostname: string, port: number) => {
    const rpcClient = jayson.Client.http({
        hostname,
        port,
        path: "/rpc",
    });

    return {
        deleteUserPosts: (userId: string): Promise<number> =>
            rpcClientRequest(
                rpcClient,
                "deleteUserPosts",
                { userId },
                parseDeletedCount,
            ),
    };
};
