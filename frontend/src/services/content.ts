import { api } from "../api";
import type { CreatePostPayload } from "../../../libs/types/post.type.js";
import type { UpdatePostPayload } from "../../../libs/types/post.type.js";
import type { Post } from "../../../libs/types/post.type.js";

const contentService = {
  getAllPosts: async (): Promise<Post[]> =>
    (await api.get<Post[]>("/posts")).data,

  getPostById: async (postId: string): Promise<Post> =>
    (await api.get<Post>(`/posts/${postId}`)).data,

  createPost: async (payload: CreatePostPayload): Promise<Post> =>
    (await api.post<Post>("/posts", payload)).data,

  updatePost: async (
    postId: string,
    payload: UpdatePostPayload,
  ): Promise<Post> => (await api.patch<Post>(`/posts/${postId}`, payload)).data,

  deletePost: async (postId: string): Promise<Post> =>
    (await api.delete<Post>(`/posts/${postId}`)).data,
};

export default contentService;
