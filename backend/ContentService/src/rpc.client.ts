import { config } from "./config.js";
import { userRPCService } from "@twitter-app/shared/rpc/services/user.RPCservice.js";

const userService = userRPCService(
    config.userServiceHost,
    config.userServicePort,
);

export { userService };
