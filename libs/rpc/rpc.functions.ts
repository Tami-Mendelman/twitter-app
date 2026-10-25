import type {
    Client as HttpClient,
    RequestParamsLike,
} from "jayson/promise/index.js";
import type { RpcResponse } from "./rpc.type.js";

const isRpcResponse = (value: unknown): value is RpcResponse =>
    typeof value === "object" && value !== null;

const isRpcError = (value: unknown): value is { message: string } =>
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string";

export const rpcClientRequest = async <T>(
    rpcClient: HttpClient,
    method: string,
    args: RequestParamsLike,
    parseResult: (result: unknown) => T,
): Promise<T> => {
    const response: unknown = await rpcClient.request(method, args);

    if (!isRpcResponse(response)) {
        throw new Error("RPC server returned an invalid response");
    }

    if (response.error !== undefined) {
        if (!isRpcError(response.error)) {
            throw new Error("RPC server returned an invalid error response");
        }

        throw new Error(`RPC method ${method} failed: ${response.error.message}`);
    }

    if (!("result" in response)) {
        throw new Error("RPC server response did not include a result");
    }

    return parseResult(response.result);
};

export const rpcServerRequest = <TArgs extends unknown[], TResult>(
    managerFunction: (...args: TArgs) => Promise<TResult>,
    parseArgs: (params: RequestParamsLike) => TArgs,
) =>
    async (params: RequestParamsLike): Promise<TResult> =>
        managerFunction(...parseArgs(params));
