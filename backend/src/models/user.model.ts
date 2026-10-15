import { model, Schema } from "mongoose";
import type { User } from "../types/user/user.type.js";

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
    },
    {
        versionKey: false,
    },
);

userSchema.index(
    { username: 1 },
    { unique: true, name: "username_1_unique" },
);

export const UserModel = model<User>(
    "User",
    userSchema,
    "users",
);