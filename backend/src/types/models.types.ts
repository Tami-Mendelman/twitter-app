import type { Types } from "mongoose";

export type User = {
    username: string;
    displayName: string;
};

export type Post = {
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
    createdAt?: Date;
};