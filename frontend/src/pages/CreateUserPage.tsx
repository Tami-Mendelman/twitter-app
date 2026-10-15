import { useCreateUserForm } from '../functions/user-form.functions';
import { useUsersStyles } from '../styles/users.styles';
import { useFeedStyles } from '../styles/feed.styles';

const CreateUserPage = () => {
  const classes = useUsersStyles();
  const pageClasses = useFeedStyles();

  const {
    register,
    handleFormSubmit,
    errors,
    isPending,
    error,
    isSuccess,
  } = useCreateUserForm();

  return (
    <main className={pageClasses.Page}>
      <header className={pageClasses.Header}>
        <h1 className={pageClasses.Title}>Create User</h1>
        <p className={pageClasses.Subtitle}>
          Register a new user
        </p>
      </header>

      <form className={classes.Form} onSubmit={handleFormSubmit}>
        <label className={classes.Field}>
          Username
          <input
            className={classes.Input}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 1,
                message: 'Username cannot be empty',
              },
            })}
          />
          {errors.username ? (
            <span className={classes.ValidationError}>
              {errors.username.message}
            </span>
          ) : null}
        </label>

        <label className={classes.Field}>
          Display name
          <input
            className={classes.Input}
            {...register('displayName', {
              required: 'Display name is required',
              minLength: {
                value: 1,
                message: 'Display name cannot be empty',
              },
            })}
          />
          {errors.displayName ? (
            <span className={classes.ValidationError}>
              {errors.displayName.message}
            </span>
          ) : null}
        </label>

        {error ? (
          <p className={pageClasses.Error}>
            Failed to create user: {error}
          </p>
        ) : null}

        {isSuccess ? (
          <p role="status">User created successfully.</p>
        ) : null}

        <button
          className={classes.Button}
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Creating user...' : 'Create User'}
        </button>
      </form>
    </main>
  );
};

export default CreateUserPage;