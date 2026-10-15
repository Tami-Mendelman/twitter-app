import { config } from "./config.js";
import { userRPCService } from "@twitter-app/shared/user.RPCservice.js";

const userService = userRPCService(
    config.userServiceHost,
    config.userServicePort,
);

export const getUserByIdRpc = async (userId: string): Promise<boolean> =>
    (await userService.getUserById(userId)) !== null;
