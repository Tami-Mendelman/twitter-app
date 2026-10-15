import { useUsersData } from '../functions/users-query.functions';
import UserCard from '../components/UserCard';
import { useFeedStyles } from '../styles/feed.styles';

const UsersPage = () => {
  const classes = useFeedStyles();
  const { data: users, isPending, error } = useUsersData();

  return (
    <main className={classes.Page}>
      <header className={classes.Header}>
        <h1 className={classes.Title}>Users</h1>
        <p className={classes.Subtitle}>All registered users</p>
      </header>

      {isPending ? (
        <p className={classes.Message}>Loading users...</p>
      ) : error ? (
        <p className={`${classes.Message} ${classes.Error}`}>
          Failed to load users: {error.message}
        </p>
      ) : !users.length ? (
        <p className={classes.Message}>No users found.</p>
      ) : (
        <section className={classes.Feed} aria-label="Users list">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </section>
      )}
    </main>
  );
};

export default UsersPage;