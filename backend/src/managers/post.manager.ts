import {
createPost,
deletePost,
getAllPosts,
getPostById,
updatePost,
} from "../repositories/post.repository.js";
import { getUserByIdManager } from "./user.manager.js";
import type { PostFields } from "../types/models.types.js";

type PostChanges = Partial<Pick<PostFields, "name" | "text" | "media">>;

export const createPostManager = async (post: PostFields) => {
const user = await getUserByIdManager(post.userId.toString());


return user ? createPost(post) : null;


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
