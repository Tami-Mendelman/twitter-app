import { model, Schema } from "mongoose";
import { MAX_TEXT_LENGTH } from "./post/post.consts.js";
import { isValidMediaUrl } from "./post/post.functions.js";
import type { Post } from "./post/post.types.js";

const postSchema = new Schema<Post>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            index: true,
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

export const PostModel = model<Post>("Post", postSchema, "posts");
