import type { Types } from "mongoose";

export type Post = {
    _id: string;
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
    createdAt: Date;
};

export type CreatePostPayload = Pick<Post, "name" | "text" | "userId" | "media">;
export type UpdatePostPayload = Partial<Pick<Post, "name" | "text" | "media">>;
