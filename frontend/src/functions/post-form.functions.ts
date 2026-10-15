import axios from 'axios';
import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import trim from 'lodash/fp/trim.js';
import { createPost } from './post.functions';
import { useAuth } from '../components/auth-context';
import type {
  CreatePostFormValues,
  CreatePostPayload,
} from '../types/models.types';

const getResponseErrorMessage = (
  error: AxiosError<{ message?: string }>,
): string => {
  const responseMessage = error.response?.data?.message
    ? trim(error.response.data.message)
    : '';

  return responseMessage || error.message;
};

const getCreatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? getResponseErrorMessage(error)
    : error.message;


const normalizeCreatePostPayload = (
  payload: CreatePostPayload,
): CreatePostPayload => ({
  ...payload,
  media: payload.media ? trim(payload.media) || undefined : undefined,
});

const requireUserId = (userId: string | undefined): string => {
  if (!userId) throw new Error('A signed-in user is required to create a post');

  return userId;
};

export const useCreatePostForm = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormValues>();

  const handleCreatePostSuccess = async (): Promise<void> => {
    reset();
    await queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: handleCreatePostSuccess,
  });

  
  const submitPost = (formValues: CreatePostFormValues): void => {
    const userId = requireUserId(user?._id);
    const payload = normalizeCreatePostPayload({
      ...formValues,
      userId,
    });

    mutation.mutate(payload);
  };

  const handleFormSubmit = handleSubmit(submitPost);

  return {
    register,
    handleFormSubmit,
    errors,
    isPending: mutation.isPending,
    error: mutation.error ? getCreatePostError(mutation.error) : null,
    isSuccess: mutation.isSuccess,
  };
};