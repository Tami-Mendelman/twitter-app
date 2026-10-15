import { useCreatePostForm } from "../functions/post-form.functions";
import { useFeedStyles } from "../styles/feed.styles";
import { usePostStyles } from "../styles/post.styles";

const CreatePostPage = () => {
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
        <h1 className={pageClasses.Title}>Create Post</h1>
        <p className={pageClasses.Subtitle}>
          Share something with your community
        </p>
      </header>

      <form className={classes.Form} onSubmit={handleFormSubmit}>
        <label className={classes.Field}>
          User
          <select
            className={classes.Input}
            {...register("userId", { required: "Please select a user" })}
            disabled={isUsersPending || Boolean(usersError)}
          >
            <option value="">Select a user</option>
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
          {isUsersPending ? <span>Loading users...</span> : null}
          {usersError ? (
            <span className={classes.ValidationError}>
              Failed to load users: {usersError.message}
            </span>
          ) : null}
          {!isUsersPending && !usersError && !users.length ? (
            <span>No users available. Create a user first.</span>
          ) : null}
        </label>

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
          <input className={classes.Input} type="url" {...register("media")} />
        </label>

        {error ? (
          <p className={pageClasses.Error}>Failed to create post: {error}</p>
        ) : null}

        {isSuccess ? <p role="status">Post created successfully.</p> : null}

        <button
          className={classes.Button}
          type="submit"
          disabled={
            isPending || isUsersPending || Boolean(usersError) || !users.length
          }
        >
          {isPending ? "Creating post..." : "Create Post"}
        </button>
      </form>
    </main>
  );
};

export default CreatePostPage;
