import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEditPostForm } from "../functions/edit-post-form.functions";
import { useFeedStyles } from "../styles/feed.styles";
import { usePostStyles } from "../styles/post.styles";
import { useTranslation } from "react-i18next";

const EditPostPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "EDIT_POST_PAGE" });
  const { t: tForm } = useTranslation("translation", { keyPrefix: "POST_FORM" });
  const { postId = "" } = useParams();
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
    watch,
    isSuccess,
    populateForm,
  } = useEditPostForm(postId);

  const textLength = watch("text")?.length ?? 0;

  useEffect(() => {
    if (post) {
      populateForm(post);
    }
  }, [post, populateForm]);

  return (
    <main className={pageClasses.Page}>
      <header className={pageClasses.Header}>
        <h1 className={pageClasses.Title}>{t("TITLE")}</h1>
        <p className={pageClasses.Subtitle}>{t("SUBTITLE")}</p>
      </header>

      {isPending && !post ? (
        <p className={pageClasses.Message}>{t("LOADING")}</p>
      ) : isPostError ? (
        <p className={`${pageClasses.Message} ${pageClasses.Error}`}>
          {t("LOAD_ERROR", { message: isPostError.message })}
        </p>
      ) : post ? (
        <form className={classes.Form} onSubmit={handleFormSubmit}>
          <label className={classes.Field}>
            {tForm("NAME")}
            <input
              className={classes.Input}
              {...register("name", { required: tForm("NAME_REQUIRED") })}
            />
            {errors.name ? (
              <span className={classes.ValidationError}>
                {errors.name.message}
              </span>
            ) : null}
          </label>
          <p>{tForm("CHARACTER_COUNT", { count: textLength })}</p>

          <label className={classes.Field}>
            {tForm("CONTENT")}
            <textarea
              className={classes.Textarea}
              maxLength={200}
              {...register("text", {
                required: tForm("CONTENT_REQUIRED"),
                maxLength: {
                  value: 200,
                  message: tForm("CONTENT_MAX_LENGTH"),
                },
              })}
            />
            {errors.text ? (
              <span className={classes.ValidationError}>
                {errors.text.message}
              </span>
            ) : null}
          </label>

          <label className={classes.Field}>
            {tForm("MEDIA_URL")}
            <input
              className={classes.Input}
              type="url"
              {...register("media")}
            />
          </label>

          {error ? (
            <p className={pageClasses.Error}>
              {t("UPDATE_ERROR", { message: error })}
            </p>
          ) : null}

          {isSuccess ? <p role="status">{t("UPDATED")}</p> : null}

          <button className={classes.Button} type="submit" disabled={isPending}>
            {isPending ? t("SAVING") : t("SAVE")}
          </button>

          <Link to="/posts">{t("CANCEL")}</Link>
        </form>
      ) : null}
    </main>
  );
};

export default EditPostPage;
