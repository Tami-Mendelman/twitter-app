import { config } from "./config.js";
import { userRPCService } from "@libs/rpc/services/user.RPCservice.js";

const userService = userRPCService(
    config.rpc.userServiceHost,
    config.rpc.userServicePort,
);

export { userService };
