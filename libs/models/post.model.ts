import type { Mongoose } from "mongoose";
import type { Post } from "../types/post.type.js";
import { MAX_TEXT_LENGTH } from "../constants/post.constants.js";

export const createPostModel = (mongoose: Mongoose) => {
    const postSchema = new mongoose.Schema<Post>(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 1,
                index: true,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
                maxlength: MAX_TEXT_LENGTH,
            },
            media: {
                type: String,
                validate: {
                    validator: (value: string) =>
                        /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value),
                    message: "Media must be a valid HTTP or HTTPS URL",
                },
            },
            likes: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
        {
            versionKey: false,
            timestamps: { createdAt: true, updatedAt: false },
        },
    );

    return mongoose.model<Post>("Post", postSchema, "posts");
};
