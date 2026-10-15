
import type { User } from '../types/models.types';
import { useUsersStyles } from '../styles/users.styles';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const classes = useUsersStyles();

  return (
    <article className={classes.Card}>
      <h2 className={classes.DisplayName}>{user.displayName}</h2>
      <p className={classes.Username}>@{user.username}</p>
    </article>
  );
};

export default UserCard;