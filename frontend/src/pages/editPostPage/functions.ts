import axios from "axios";
import { isNil, trim } from "lodash/fp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import contentService from "../../services/content";
import { QUERY_KEYS } from "../../utils/queryKeys";
import type { UpdatePostPayload } from "../../../../libs/types/post.type.js";

const getUpdatePostError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? trim(error.response?.data?.message ?? "") || error.message
    : error.message;

export const useEditPostForm = (postId: string) => {
  const queryClient = useQueryClient();

  const {
    data: post,
    isPending: isPendingPost,
    error: postError,
  } = useQuery({
    queryKey: [...QUERY_KEYS.POST_BY_ID, postId],
    queryFn: () => contentService.getPostById(postId),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdatePostPayload>({
    values: !isNil(post)
      ? {
          name: post.name,
          text: post.text,
          media: post.media ?? "",
        }
      : undefined,
  });

  const {
    mutate: update,
    isPending: isPendingUpdate,
    error: updateError,
    isSuccess: isUpdated,
  } = useMutation({
    mutationFn: (payload: UpdatePostPayload) =>
      contentService.updatePost(postId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });

  const submitPost = (payload: UpdatePostPayload): void => {
    update({
      ...payload,
      media: trim(payload.media ?? "") || undefined,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    textLength: useWatch({ control, name: "text" })?.length ?? 0,
    post,
    isPending: isPendingPost || isPendingUpdate,
    isPostError: postError,
    error: updateError ? getUpdatePostError(updateError) : null,
    isSuccess: isUpdated,
    handleFormSubmit: handleSubmit(submitPost),
  };
};
