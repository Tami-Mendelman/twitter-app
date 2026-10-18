import type { Types } from "mongoose";

export type Post = {
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
    createdAt: Date;
};

export type CreatePostPayload = Pick<Post, "name" | "text"> & {
    media?: string;
};

export type CreatePostDocument = CreatePostPayload & {
    userId: string;
};

export type UpdatePostPayload = Partial<Pick<Post, "name" | "text" | "media">>;
