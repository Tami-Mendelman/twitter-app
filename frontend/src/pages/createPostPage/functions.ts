import axios from "axios";
import { trim } from "lodash/fp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import contentService from "../../services/content";
import userService from "../../services/user";
import { QUERY_KEYS } from "../../utils/queryKeys";
import type { CreatePostPayload } from "../../../../libs/types/post.type.js";

const getCreatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? trim(error.response?.data?.message ?? "") || error.message
    : error.message;

export const useCreatePostForm = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isPending: isPendingUsers,
    error: usersError,
  } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostPayload>();

  const {
    mutate: create,
    isPending: isPendingCreatePost,
    error: createPostError,
    isSuccess: isSuccessCreatePost,
  } = useMutation({
    mutationFn: contentService.createPost,
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });

  const submitPost = (payload: CreatePostPayload): void => {
    create(payload);
  };

  return {
    register,
    handleSubmit,
    submitPost,
    errors,
    users,
    isPendingUsers,
    usersError,
    isPendingCreatePost,
    createPostError: createPostError ? getCreatePostError(createPostError) : null,
    isSuccessCreatePost,
  };
};
