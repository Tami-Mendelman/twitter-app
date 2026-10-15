import { useCreatePostForm } from "../functions/post-form.functions";
import { useFeedStyles } from "../styles/feed.styles";
import { usePostStyles } from "../styles/post.styles";
import { useTranslation } from "react-i18next";

const CreatePostPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "CREATE_POST_PAGE" });
  const { t: tForm } = useTranslation("translation", { keyPrefix: "POST_FORM" });
  const pageClasses = useFeedStyles();
  const classes = usePostStyles();

  const {
    register,
    handleFormSubmit,
    errors,
    users,
    isUsersPending,
    usersError,
    isPending,
    error,
    isSuccess,
  } = useCreatePostForm();

  return (
    <main className={pageClasses.Page}>
      <header className={pageClasses.Header}>
        <h1 className={pageClasses.Title}>{t("TITLE")}</h1>
        <p className={pageClasses.Subtitle}>
          {t("SUBTITLE")}
        </p>
      </header>

      <form className={classes.Form} onSubmit={handleFormSubmit}>
        <label className={classes.Field}>
          {tForm("USER")}
          <select
            className={classes.Input}
            {...register("userId", { required: tForm("SELECT_USER") })}
            disabled={isUsersPending || Boolean(usersError)}
          >
            <option value="">{tForm("SELECT_USER")}</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.displayName} (@{user.username})
              </option>
            ))}
          </select>
          {errors.userId ? (
            <span className={classes.ValidationError}>
              {errors.userId.message}
            </span>
          ) : null}
          {isUsersPending ? <span>{tForm("LOADING_USERS")}</span> : null}
          {usersError ? (
            <span className={classes.ValidationError}>
              {tForm("LOAD_USERS_ERROR", { message: usersError.message })}
            </span>
          ) : null}
          {!isUsersPending && !usersError && !users.length ? (
            <span>{tForm("NO_USERS")}</span>
          ) : null}
        </label>

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
          <input className={classes.Input} type="url" {...register("media")} />
        </label>

        {error ? (
          <p className={pageClasses.Error}>
            {t("CREATE_ERROR", { message: error })}
          </p>
        ) : null}

        {isSuccess ? <p role="status">{t("CREATED")}</p> : null}

        <button
          className={classes.Button}
          type="submit"
          disabled={
            isPending || isUsersPending || Boolean(usersError) || !users.length
          }
        >
          {isPending ? t("SUBMITTING") : t("SUBMIT")}
        </button>
      </form>
    </main>
  );
};

export default CreatePostPage;
