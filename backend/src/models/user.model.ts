import { model, Schema } from "mongoose";
import type { UserFields } from "../types/models.types.js";

const userSchema = new Schema<UserFields>(
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
    { unique: true, name: "username_1" },
);

export const UserModel = model<UserFields>(
    "User",
    userSchema,
    "users",
);