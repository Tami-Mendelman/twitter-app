import type { FC } from "react";
import type { Post } from "../../../libs/types/post.type.js";
import type { User } from "../../../libs/types/user.type.js";
import { find, isEmpty, map, trim } from "lodash/fp";
import { useFeedStyles } from "../styles/feed.styles";
import { usePostStyles } from "../styles/post.styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type FeedContentProps = {
  posts?: Post[];
  users?: User[];
  isPending: boolean;
  error: Error | null;
  searchTerm: string;
};

const FeedContent: FC<FeedContentProps> = ({
  posts,
  users,
  isPending,
  error,
  searchTerm,
}: FeedContentProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "FEED_CONTENT" });
  const classes = useFeedStyles();
  const { t: tPost } = useTranslation("translation", { keyPrefix: "POST_CARD" });
  const postClasses = usePostStyles();

  const PostCard: FC<{ post: Post; author?: User }> = ({ post, author }) => (
    <article className={postClasses.card}>
      <p className={postClasses.author}>
        {author?.displayName ?? tPost("UNKNOWN_USER")}
      </p>

      <p className={postClasses.username}>
        {author ? `@${author.username}` : tPost("USER_UNAVAILABLE")}
      </p>

      <h2 className={postClasses.name}>{post.name}</h2>
      <p className={postClasses.text}>{post.text}</p>

      {post.media && (
        <a
          className={postClasses.media}
          href={post.media}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tPost("VIEW_MEDIA")}
        </a>
      )}

      <div className={postClasses.footer}>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString("he-IL")
            : tPost("DATE_UNAVAILABLE")}
        </span>
        <span>{tPost("LIKES", { count: post.likes ?? 0 })}</span>
        <Link to={`/posts/${post._id}/edit`}>{tPost("EDIT")}</Link>
      </div>
    </article>
  );

  return (
    <>
      {isPending ? (
        <p className={classes.message}>{t("LOADING")}</p>
      ) : error ? (
        <p className={`${classes.message} ${classes.error}`}>
          {t("LOAD_ERROR", { message: error.message })}
        </p>
      ) : isEmpty(posts) ? (
        <p className={classes.message}>
          {trim(searchTerm) ? t("NO_SEARCH_RESULTS") : t("NO_POSTS")}
        </p>
      ) : (
        <div className={classes.feed}>
          {map((post: Post) => (
            <PostCard
              key={post._id}
              post={post}
              author={find((user: User) => user._id === String(post.userId))(users ?? [])}
            />
          ))(posts ?? [])}
        </div>
      )}
    </>
  );
};

export default FeedContent;
