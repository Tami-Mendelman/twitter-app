import type { FC } from "react";
import { isEmpty, isNil, map, trim } from "lodash/fp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";
import type { CreatePostPayload } from "@libs/types/post.type.js";
import type { User } from "@libs/types/user.type.js";
import contentService from "../../services/content";
import userService from "../../services/user";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { MAX_TEXT_LENGTH } from "@libs/consts/post.consts.js";
import { getAxiosErrorMessage } from "@libs/utils/getAxiosErrorMessage.js";

export const CreatePostPage: FC = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "CREATE_POST_PAGE",
  });
  const { t: tForm } = useTranslation("translation", {
    keyPrefix: "POST_FORM",
  });
  const classes = useStyles();
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
    setValue,
    formState: { errors },
  } = useForm<CreatePostPayload>();

  const {
    mutate: create,
    isPending: isPendingCreatePost,
    error: createPostErrorRaw,
    isSuccess: isSuccessCreatePost,
  } = useMutation({
    mutationFn: contentService.createPost,
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POSTS,
      });
    },
  });

  const submitPost = (payload: CreatePostPayload): void => {
    create(payload);
  };

  const handleFormSubmit = handleSubmit((payload: CreatePostPayload) => {
    submitPost({
      ...payload,
      media: trim(payload.media ?? "") || undefined,
    });
  });

  const createPostError = createPostErrorRaw
    ? getAxiosErrorMessage(createPostErrorRaw)
    : null;

  return (
    <div>
      <header>
        <h1>{t("TITLE")}</h1>
        <p>{t("SUBTITLE")}</p>
      </header>

      <form className={classes.form} onSubmit={handleFormSubmit}>
        <label className={classes.field}>
          {tForm("USER")}
          <select
            className={classes.input}
            {...register("userId", {
              required: tForm("SELECT_USER"),
            })}
            disabled={isPendingUsers || !isNil(usersError)}
          >
            <option >{tForm("SELECT_USER")}</option>
            {map(({ _id, username, displayName }: User) => (
              <option key={_id} value={_id}>
                {displayName} (@{username})
              </option>
            ))(users)}
          </select>

          {errors.userId && (
            <span className={classes.validationError}>
              {errors.userId.message}
            </span>
          )}

          {isPendingUsers && <span>{tForm("LOADING_USERS")}</span>}

          {!isNil(usersError) && (
            <span className={classes.validationError}>
              {tForm("LOAD_USERS_ERROR", {
                message: usersError.message,
              })}
            </span>
          )}

          {!isPendingUsers && isNil(usersError) && isEmpty(users) && (
            <span>{tForm("NO_USERS")}</span>
          )}
        </label>

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
                  maxLength: MAX_TEXT_LENGTH,
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

        <label className={classes.field}>
          {tForm("MEDIA_UPLOAD")}
          <input
            className={classes.input}
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setValue("media", String(reader.result));
              reader.readAsDataURL(file);
            }}
          />
        </label>

        {createPostError && (
          <p>{t("CREATE_ERROR", { message: createPostError })}</p>
        )}

        {isSuccessCreatePost && <p role="status">{t("CREATED")}</p>}

        <button
          className={classes.button}
          type="submit"
          disabled={
            isPendingCreatePost ||
            isPendingUsers ||
            !isNil(usersError) ||
            isEmpty(users)
          }
        >
          {isPendingCreatePost ? t("SUBMITTING") : t("SUBMIT")}
        </button>
      </form>
    </div>
  );
};


