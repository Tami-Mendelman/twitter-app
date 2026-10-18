import { api } from '../api';
import type {
  CreatePostPayload,
  Post,
  UpdatePostPayload,
} from '../types/models.types';

export const getAllPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts');

  return data;
};

export const getPostById = async (postId: string): Promise<Post> => {
  const { data } = await api.get<Post>(`/posts/${postId}`);

  return data;
};

export const createPost = async (
  payload: CreatePostPayload,
): Promise<Post> => {
  const { data } = await api.post<Post>('/posts', payload);

  return data;
};

export const updatePost = async (
  postId: string,
  payload: UpdatePostPayload,
): Promise<Post> => {
  const { data } = await api.patch<Post>(`/posts/${postId}`, payload);

  return data;
};

export const deletePost = async (postId: string): Promise<Post> => {
  const { data } = await api.delete<Post>(`/posts/${postId}`);

  return data;
};