import { model, Schema } from "mongoose";
import type { Post } from "../types/models.types.js";
import { isValidMediaUrl } from "../functions/post.functions.js";

const MAX_TEXT_LENGTH = 200;

const postSchema = new Schema<Post>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        userId: {
            type: Schema.Types.ObjectId,
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
                validator: isValidMediaUrl,
                message: "Media must be a valid HTTP or HTTPS URL",
            },
        },
        likes: {
            type: Number,
            default: 0,
            min: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    },
);

postSchema.index({ name: 1 }, { name: "name_1" });

export const PostModel = model<Post>(
    "Post",
    postSchema,
    "posts",
);