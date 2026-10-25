import type { Post } from "@libs/types/post.type.js";

export type CreatePostPayload = Pick<
    Post,
    "name" | "text" | "userId" | "media"
>;

export type UpdatePostPayload = Partial<Pick<Post, "name" | "text" | "media">>;
