import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEditPostForm } from "../functions/edit-post-form.functions";
import { useFeedStyles } from "../styles/feed.styles";
import { usePostStyles } from "../styles/post.styles";

const EditPostPage = () => {
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
        <h1 className={pageClasses.Title}>Edit Post</h1>
        <p className={pageClasses.Subtitle}>Update your post</p>
      </header>

      {isPending && !post ? (
        <p className={pageClasses.Message}>Loading post...</p>
      ) : isPostError ? (
        <p className={`${pageClasses.Message} ${pageClasses.Error}`}>
          Failed to load post: {isPostError.message}
        </p>
      ) : post ? (
        <form className={classes.Form} onSubmit={handleFormSubmit}>
          <label className={classes.Field}>
            Post name
            <input
              className={classes.Input}
              {...register("name", { required: "Post name is required" })}
            />
            {errors.name ? (
              <span className={classes.ValidationError}>
                {errors.name.message}
              </span>
            ) : null}
          </label>
          <p>{textLength}/200 characters</p>

          <label className={classes.Field}>
            Content
            <textarea
              className={classes.Textarea}
              maxLength={200}
              {...register("text", {
                required: "Post content is required",
                maxLength: {
                  value: 200,
                  message: "Post content cannot exceed 200 characters",
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
            Media URL (optional)
            <input
              className={classes.Input}
              type="url"
              {...register("media")}
            />
          </label>

          {error ? (
            <p className={pageClasses.Error}>Failed to update post: {error}</p>
          ) : null}

          {isSuccess ? <p role="status">Post updated successfully.</p> : null}

          <button className={classes.Button} type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </button>

          <Link to="/posts">Cancel</Link>
        </form>
      ) : null}
    </main>
  );
};

export default EditPostPage;
