import type { Types } from "mongoose";

export type Post = {
    name: string;
    userId: Types.ObjectId;
    text: string;
    media?: string;
    likes?: number;
<<<<<<<< HEAD:backend/ContentService/src/post/post.types.ts
    createdAt?: Date;
};

export type CreatePost = Pick<Post, "name" | "text"> & {
    userId: string;
    media?: string;
};

export type PostChanges = Partial<Pick<Post, "name" | "text" | "media">>;
========
    createdAt: Date;
};
>>>>>>>> 0f15fe537095090cb3aaf199b800ca7432320cfc:backend/src/types/content/post.type.ts
