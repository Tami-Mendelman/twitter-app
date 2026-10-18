import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth-context';
import { deletePost, getPostById, updatePost } from './post.functions';
import type { Post, UpdatePostPayload } from '../types/models.types';

const getUpdatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? error.response?.data?.message?.trim() || error.message
    : error.message;

export const useEditPostForm = (postId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadPost = () => getPostById(postId);
  const postQuery = useQuery({
    queryKey: ['posts', postId],
    queryFn: loadPost,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
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

  const populateFormFromQuery = useCallback(
    (): void => postQuery.data ? populateForm(postQuery.data) : undefined,
    [postQuery.data, populateForm],
  );

  useEffect(populateFormFromQuery, [populateFormFromQuery]);

  const updateCurrentPost = (payload: UpdatePostPayload) =>
    updatePost(postId, payload);
  const deleteCurrentPost = () => deletePost(postId);

  const handleUpdatePostSuccess = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const handleDeletePostSuccess = async (): Promise<void> => {
    queryClient.removeQueries({ queryKey: ['posts', postId] });
    await queryClient.invalidateQueries({
      queryKey: ['posts'],
      exact: true,
    });
    navigate('/posts', { replace: true });
  };

  const mutation = useMutation({
    mutationFn: updateCurrentPost,
    onSuccess: handleUpdatePostSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCurrentPost,
    onSuccess: handleDeletePostSuccess,
  });

  const submitPost = (payload: UpdatePostPayload): void => {
    mutation.mutate({
      ...payload,
      media: payload.media?.trim() || undefined,
    });
  };

  const handleFormSubmit = handleSubmit(submitPost);

  const watchedText = useWatch({ control, name: 'text' });
  const textLength = watchedText?.length ?? 0;
  const submitDelete = (): void => {
    deleteMutation.mutate();
  };

  return {
    register,
    handleFormSubmit,
    errors,
    textLength,
    post: postQuery.data,
    isOwner: postQuery.data?.userId === user?._id,
    isPending: postQuery.isPending || mutation.isPending,
    isPostError: postQuery.error,
    error: mutation.error ? getUpdatePostError(mutation.error) : null,
    deleteError: deleteMutation.error
      ? getUpdatePostError(deleteMutation.error)
      : null,
    isDeletePending: deleteMutation.isPending,
    isSuccess: mutation.isSuccess,
    submitDelete,
  };
};