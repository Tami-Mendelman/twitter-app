import type { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";
import type { PostCardProps } from "./types";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../services/user";
import { QUERY_KEYS } from "../../../../utils/queryKeys";

export const PostCard: FC<PostCardProps> = ({
  post: { _id, text, name, userId, media, likes, createdAt },
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "POST_CARD" });
  const classes = useStyles();

  const { data: users } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });

  const author = users?.find(
    (user) => String(user._id) === String(userId)
  );

  return (
    <article className={classes.card}>
      <p className={classes.author}>
        {author?.displayName ?? t("UNKNOWN_USER")}
      </p>

      <p className={classes.username}>
        {author ? `@${author.username}` : t("USER_UNAVAILABLE")}
      </p>

      <h2 className={classes.name}>{name}</h2>
      <p className={classes.text}>{text}</p>

      {media && (
        <a
          className={classes.media}
          href={media}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("VIEW_MEDIA")}
        </a>
      )}

      <div className={classes.footer}>
        {createdAt
          ? new Date(createdAt).toLocaleString("he-IL")
          : t("DATE_UNAVAILABLE")}
        <span>{t("LIKES", { count: likes ?? 0 })}</span>
        <Link to={`/posts/${_id}/edit`}>{t("EDIT")}</Link>
      </div>
    </article>
  );
};
