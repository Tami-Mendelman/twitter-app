import { api } from "../../config";
import type {
  CreateUserPayload,
  User,
} from "../../../libs/types/user.type.js";

const userService = {
  getAllUsers: async (): Promise<User[]> =>
    (await api.get<User[]>("/users")).data,

  createUser: async (payload: CreateUserPayload): Promise<User> =>
    (await api.post<User>("/users", payload)).data,
};

export default userService;
