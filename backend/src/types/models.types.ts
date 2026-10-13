import type { Types } from "mongoose";

export type UserFields = {
    username: string;
    displayName: string;
};

export type PostFields = {
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
    createdAt?: Date;
};