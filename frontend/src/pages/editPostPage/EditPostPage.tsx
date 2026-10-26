import type { FC } from "react";
import { isNil, trim } from "lodash/fp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFeedStyles } from "../../styles/feed.styles";
import { usePostStyles } from "../../styles/post.styles";
import { useTranslation } from "react-i18next";
import contentService from "../../services/content";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { getAxiosErrorMessage } from "../../../../libs/utils/getAxiosErrorMessage.js";
import type { UpdatePostPayload } from "../../../../libs/types/post.type.js";
import { MAX_TEXT_LENGTH } from "../../../../libs/consts/post.consts.js";

const EditPostPage: FC = () => {
  const { postId } = useParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "EDIT_POST_PAGE",
  });
  const { t: tForm } = useTranslation("translation", {
    keyPrefix: "POST_FORM",
  });
  const pageClasses = useFeedStyles();
  const classes = usePostStyles();
  const queryClient = useQueryClient();

  const {
    data: post,
    isPending: isPendingPost,
    error: postError,
  } = useQuery({
    queryKey: [...QUERY_KEYS.POST_BY_ID, postId],
    queryFn: () => contentService.getPostById(postId!),
    enabled: !isNil(postId),
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
    error: updateErrorRaw,
    isSuccess: isUpdated,
  } = useMutation({
    mutationFn: (payload: UpdatePostPayload) =>
      contentService.updatePost(postId!, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POSTS,
      });
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.POST_BY_ID, postId],
      });
    },
  });

  const submitPost = (payload: UpdatePostPayload): void => {
    update({
      ...payload,
      media: trim(payload.media ?? "") || undefined,
    });
  };

  const handleFormSubmit = handleSubmit(submitPost);

  const textLength = useWatch({ control, name: "text" })?.length ?? 0;
  const isPending = isPendingPost || isPendingUpdate;
  const error = !isNil(updateErrorRaw)
    ? getAxiosErrorMessage(updateErrorRaw)
    : null;

  return (
    <>
      {isNil(postId) ? (
        <Navigate to="/posts" replace />
      ) : (
        <div className={pageClasses.page}>
          <header className={pageClasses.header}>
            <h1 className={pageClasses.title}>{t("TITLE")}</h1>
            <p className={pageClasses.subtitle}>{t("SUBTITLE")}</p>
          </header>

          {isPendingPost && isNil(post) ? (
            <p className={pageClasses.message}>{t("LOADING")}</p>
          ) : !isNil(postError) ? (
            <p
              className={`${pageClasses.message} ${pageClasses.error}`}
            >
              {t("LOAD_ERROR", { message: postError.message })}
            </p>
          ) : !isNil(post) ? (
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <label className={classes.field}>
                {tForm("NAME")}
                <input
                  className={classes.input}
                  {...register("name", {
                    required: tForm("NAME_REQUIRED"),
                  })}
                />
                {errors.name && (
                  <span className={classes.validationError}>
                    {errors.name.message}
                  </span>
                )}
              </label>

              <p>
                {tForm("CHARACTER_COUNT", {
                  count: textLength,
                  MAX_LENGTH: MAX_TEXT_LENGTH,
                })}
              </p>

              <label className={classes.field}>
                {tForm("CONTENT")}
                <textarea
                  className={classes.textarea}
                  maxLength={MAX_TEXT_LENGTH}
                  {...register("text", {
                    required: tForm("CONTENT_REQUIRED"),
                    maxLength: {
                      value: MAX_TEXT_LENGTH,
                      message: tForm("CONTENT_MAX_LENGTH", {
                        MAX_LENGTH: MAX_TEXT_LENGTH,
                      }),
                    },
                  })}
                />
                {errors.text && (
                  <span className={classes.validationError}>
                    {errors.text.message}
                  </span>
                )}
              </label>

              <label className={classes.field}>
                {tForm("MEDIA_URL")}
                <input
                  className={classes.input}
                  type="url"
                  {...register("media")}
                />
              </label>

              {error && (
                <p className={pageClasses.error}>
                  {t("UPDATE_ERROR", { message: error })}
                </p>
              )}

              {isUpdated && <p role="status">{t("UPDATED")}</p>}

              <button
                className={classes.button}
                type="submit"
                disabled={isPending}
              >
                {isPendingUpdate ? t("SAVING") : t("SAVE")}
              </button>

              <Link to="/posts">{t("CANCEL")}</Link>
            </form>
          ) : (
            <p className={pageClasses.message}>{t("LOADING")}</p>
          )}
        </div>
      )}
    </>
  );
};

export default EditPostPage;
