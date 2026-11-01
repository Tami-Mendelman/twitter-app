import { model, Schema } from "mongoose";
import type { Post } from "../types/post.type.js";
import { MAX_TEXT_LENGTH } from "../consts/post.consts.js";

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
                validator: (value: string) =>
                    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value) ||
                    /^data:/i.test(value),
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

export const postModel = model<Post>("Post", postSchema, "posts");
