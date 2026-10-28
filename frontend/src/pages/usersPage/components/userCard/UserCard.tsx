import type { FC } from "react";
import { useStyles } from "./styles";
import type { UserCardProps } from "./types";

const UserCard: FC<UserCardProps> = ({ user }) => {
  const classes = useStyles();
  
  return (
    <article className={classes.card}>
      <h2 className={classes.displayName}>{user?.displayName}</h2>
      <p className={classes.username}>@{user?.username}</p>
    </article>
  );
};

export default UserCard;
