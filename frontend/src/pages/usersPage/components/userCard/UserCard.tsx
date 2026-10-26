import type { FC } from "react";
import type { User } from "../../../../../libs/types/user.type.js";
import { useUserCardStyles } from "./styles";

export type UserCardProps = {
  user: User;
};

const UserCard: FC<UserCardProps> = ({ user }) => {
  const classes = useUserCardStyles();
  return (
    <article className={classes.card}>
      <h2 className={classes.displayName}>{user?.displayName}</h2>
      <p className={classes.username}>@{user?.username}</p>
    </article>
  );
};

export default UserCard;
