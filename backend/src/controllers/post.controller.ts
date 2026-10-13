
import type { RequestHandler, Response } from "express";
import {
    createPostManager,
    deletePostManager,
    getAllPostsManager,
    getPostByIdManager,
    updatePostManager,
} from "../managers/post.manager.js";
import type { PostFields } from "../types/models.types.js";

type PostChanges = Partial<Pick<PostFields, "name" | "text" | "media">>;

type CreatePostHandler = RequestHandler<
    Record<string, string>,
    unknown,
    PostFields
>;

type UpdatePostHandler = RequestHandler<
    { postId: string },
    unknown,
    PostChanges
>;

type PostIdHandler = RequestHandler<{ postId: string }>;

type PostResult = Awaited<ReturnType<typeof getPostByIdManager>>;

const sendPostResponse = (
    res: Response,
    post: PostResult,
): void =>
    post
        ? void res.status(200).json(post)
        : void res.status(404).json({ message: "Post not found" });

const createPost: CreatePostHandler = async (req, res): Promise<void> => {
const post = await createPostManager(req.body);


if (!post) {
    res.status(404).json({ message: "User not found" });
    return;
}

res.status(201).json(post);


};


const getAllPosts: RequestHandler = async (_req, res): Promise<void> => {
    const posts = await getAllPostsManager();
    res.status(200).json(posts);
};

const getPostById: PostIdHandler = async (req, res): Promise<void> => {
    const post = await getPostByIdManager(req.params.postId);
    sendPostResponse(res, post);
};

const updatePost: UpdatePostHandler = async (req, res): Promise<void> => {
    const post = await updatePostManager(req.params.postId, req.body);
    sendPostResponse(res, post);
};

const deletePost: PostIdHandler = async (req, res): Promise<void> => {
    const post = await deletePostManager(req.params.postId);
    sendPostResponse(res, post);
};

export const createPostController = createPost;
export const getAllPostsController = getAllPosts;
export const getPostByIdController = getPostById;
export const updatePostController = updatePost;
export const deletePostController = deletePost;