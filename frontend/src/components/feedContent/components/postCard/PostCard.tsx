import type { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Post } from "../../../../../libs/types/post.type.js";
import type { User } from "../../../../../libs/types/user.type.js";
import { usePostCardStyles } from "./styles";

export type PostCardProps = {
  post: Post;
  author?: User;
};

const PostCard: FC<PostCardProps> = ({ post, author }) => {
  const { t } = useTranslation("translation", { keyPrefix: "POST_CARD" });
  const classes = usePostCardStyles();

  return (
    <article className={classes.card}>
      <p className={classes.author}>
        {author?.displayName ?? t("UNKNOWN_USER")}
      </p>

      <p className={classes.username}>
        {author ? `@${author.username}` : t("USER_UNAVAILABLE")}
      </p>

      <h2 className={classes.name}>{post.name}</h2>
      <p className={classes.text}>{post.text}</p>

      {post.media && (
        <a
          className={classes.media}
          href={post.media}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("VIEW_MEDIA")}
        </a>
      )}

      <div className={classes.footer}>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString("he-IL")
            : t("DATE_UNAVAILABLE")}
        </span>
        <span>{t("LIKES", { count: post.likes ?? 0 })}</span>
        <Link to={`/posts/${post._id}/edit`}>{t("EDIT")}</Link>
      </div>
    </article>
  );
};

export default PostCard;
