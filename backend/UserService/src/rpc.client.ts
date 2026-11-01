import { config } from "./config.js";
import { postRpcService } from "@libs/rpc/services/post.RPCservice.js";

export const postService = postRpcService(
    config.rpc.postServiceHost,
    config.rpc.postServicePort,
);
