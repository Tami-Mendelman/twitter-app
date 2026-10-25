import type { FC } from "react";
import { isEmpty, map, trim } from "lodash/fp";
import { useTranslation } from "react-i18next";
import { useCreatePostForm } from "./functions";
import { useFeedStyles } from "../../styles/feed.styles";
import { usePostStyles } from "../../styles/post.styles";
import type { CreatePostPayload } from "../../../../libs/types/post.type.js";
import type { User } from "../../../../libs/types/user.type.js";
import { MAX_TEXT_LENGTH } from "../../../../libs/constants/post.constants.js";

const CreatePostPage: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "CREATE_POST_PAGE" });
  const { t: tForm } = useTranslation("translation", { keyPrefix: "POST_FORM" });
  const pageClasses = useFeedStyles();
  const classes = usePostStyles();

  const {
    register,
    handleSubmit,
    submitPost,
    errors,
    users,
    isPendingUsers,
    usersError,
    isPendingCreatePost,
    createPostError,
    isSuccessCreatePost,
  } = useCreatePostForm();

  const handleFormSubmit = handleSubmit((payload: CreatePostPayload) => {
    submitPost({
      ...payload,
      media: trim(payload.media ?? "") || undefined,
    });
  });

  return (
    <div className={pageClasses.page}>
      <header className={pageClasses.header}>
        <h1 className={pageClasses.title}>{t("TITLE")}</h1>
        <p className={pageClasses.subtitle}>{t("SUBTITLE")}</p>
      </header>

      <form className={classes.form} onSubmit={handleFormSubmit}>
        <label className={classes.field}>
          {tForm("USER")}
          <select
            className={classes.input}
            {...register("userId", { required: tForm("SELECT_USER") })}
            disabled={isPendingUsers || Boolean(usersError)}
          >
            <option>{tForm("SELECT_USER")}</option>
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
          {usersError && (
            <span className={classes.validationError}>
              {tForm("LOAD_USERS_ERROR", { message: usersError.message })}
            </span>
          )}
          {!isPendingUsers && !usersError && isEmpty(users) && (
            <span>{tForm("NO_USERS")}</span>
          )}
        </label>

        <label className={classes.field}>
          {tForm("NAME")}
          <input
            className={classes.input}
            {...register("name", { required: tForm("NAME_REQUIRED") })}
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
                message: tForm("CONTENT_MAX_LENGTH"),
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
          <input className={classes.input} type="url" {...register("media")} />
        </label>

        {createPostError && (
          <p className={pageClasses.error}>
            {t("CREATE_ERROR", { message: createPostError })}
          </p>
        )}

        {isSuccessCreatePost && <p role="status">{t("CREATED")}</p>}

        <button
          className={classes.button}
          type="submit"
          disabled={
            isPendingCreatePost ||
            isPendingUsers ||
            Boolean(usersError) ||
            !users.length
          }
        >
          {isPendingCreatePost ? t("SUBMITTING") : t("SUBMIT")}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
