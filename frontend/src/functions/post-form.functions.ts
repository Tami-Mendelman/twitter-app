import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createPost } from './post.functions';
import { useAuth } from '../components/auth-context';
import type { CreatePostPayload } from '../types/models.types';

const getCreatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? error.response?.data?.message?.trim() || error.message
    : error.message;

const normalizeCreatePostPayload = (
  payload: CreatePostPayload,
): CreatePostPayload => ({
  ...payload,
  media: payload.media?.trim() || undefined,
});

export const useCreatePostForm = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostPayload>();

  const handleCreatePostSuccess = async (): Promise<void> => {
    reset();
    await queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: handleCreatePostSuccess,
  });

  const submitPost = (payload: CreatePostPayload): void => {
    mutation.mutate(normalizeCreatePostPayload(payload));
  };

  const handleFormSubmit = handleSubmit(submitPost);

  return {
    register,
    handleFormSubmit,
    errors,
    user,
    isPending: mutation.isPending,
    error: mutation.error ? getCreatePostError(mutation.error) : null,
    isSuccess: mutation.isSuccess,
  };
};