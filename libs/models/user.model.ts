import type { Mongoose } from "mongoose";
import type { User } from "../types/user.type.js";

export const createUserModel = (mongoose: Mongoose) => {
    const userSchema = new mongoose.Schema<User>(
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

    return mongoose.model<User>("User", userSchema, "users");
};
