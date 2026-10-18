import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { getPostById, updatePost } from './post.functions';
import type { Post, UpdatePostPayload } from '../types/models.types';
import { useCallback } from 'react';

const getUpdatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? error.response?.data?.message?.trim() || error.message
    : error.message;

export const useEditPostForm = (postId: string) => {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdatePostPayload>();

  const populateForm = useCallback(
  (post: Post): void => {
    reset({
      name: post.name,
      text: post.text,
      media: post.media ?? '',
    });
  },
  [reset],
);
  
  const updatePostSuccess = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const mutation = useMutation({
    mutationFn: (payload: UpdatePostPayload) => updatePost(postId, payload),
    onSuccess: updatePostSuccess,
  });

  const submitPost = (payload: UpdatePostPayload): void => {
    mutation.mutate({
      ...payload,
      media: payload.media?.trim() || undefined,
    });
  };

  const handleFormSubmit = handleSubmit(submitPost);

  return {
    register,
    handleFormSubmit,
    errors,
    watch,
    post: postQuery.data,
    isPending: postQuery.isPending || mutation.isPending,
    isPostError: postQuery.error,
    error: mutation.error ? getUpdatePostError(mutation.error) : null,
    isSuccess: mutation.isSuccess,
    populateForm,
  };
};