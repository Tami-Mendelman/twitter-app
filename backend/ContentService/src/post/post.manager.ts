import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from "./post.repository.js";
import { getUserByIdRpc } from "../rpc.client.js";
import type { CreatePost, PostChanges } from "@twitter-app/shared/type/post.types.js";

export const createPostManager = async (post: CreatePost) => {
    const userExists = await getUserByIdRpc(post.userId);

    return userExists ? createPost(post) : null;
};

export const getAllPostsManager = async () =>
    getAllPosts();

export const getPostByIdManager = async (postId: string) =>
    getPostById(postId);

export const updatePostManager = async (
    postId: string,
    changes: PostChanges,
) => updatePost(postId, changes);

export const deletePostManager = async (postId: string) =>
    deletePost(postId);
