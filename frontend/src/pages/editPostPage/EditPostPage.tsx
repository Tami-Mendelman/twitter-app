import type { FC } from "react";
import { isNil } from "lodash/fp";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEditPostForm } from "./functions";
import { useFeedStyles } from "../../styles/feed.styles";
import { usePostStyles } from "../../styles/post.styles";
import { useTranslation } from "react-i18next";
import { MAX_TEXT_LENGTH } from "../../../../libs/constants/post.constants.js";

const EditPostPage: FC = () => {
  const { postId } = useParams();

  return postId ? <EditPostForm postId={postId} /> : <Navigate to="/posts" replace />;
};

const EditPostForm: FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "EDIT_POST_PAGE" });
  const { t: tForm } = useTranslation("translation", { keyPrefix: "POST_FORM" });
  const pageClasses = useFeedStyles();
  const classes = usePostStyles();
  const {
    register,
    handleFormSubmit,
    errors,
    post,
    isPending,
    isPostError,
    error,
    textLength,
    isSuccess,
  } = useEditPostForm(postId);

  return (
    <div className={pageClasses.page}>
      <header className={pageClasses.header}>
        <h1 className={pageClasses.title}>{t("TITLE")}</h1>
        <p className={pageClasses.subtitle}>{t("SUBTITLE")}</p>
      </header>

      {isPending && isNil(post) ? (
        <p className={pageClasses.message}>{t("LOADING")}</p>
      ) : isPostError ? (
        <p className={`${pageClasses.message} ${pageClasses.error}`}>
          {t("LOAD_ERROR", { message: isPostError.message })}
        </p>
      ) : !isNil(post) && (
        <form className={classes.form} onSubmit={handleFormSubmit}>
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
          <p>{tForm("CHARACTER_COUNT", { count: textLength })}</p>

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

          {isSuccess && <p role="status">{t("UPDATED")}</p>}

          <button className={classes.button} type="submit" disabled={isPending}>
            {isPending ? t("SAVING") : t("SAVE")}
          </button>

          <Link to="/posts">{t("CANCEL")}</Link>
        </form>
      )}
    </div>
  );
};

export default EditPostPage;
