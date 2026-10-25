import type { Types } from "mongoose";

export type Post = {
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
    createdAt: Date;
};
