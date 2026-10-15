import type { Post, User } from "../types/models.types";
import { getUserById } from "../functions/user.functions";
import { useFeedStyles } from "../styles/feed.styles";
import { useTranslation } from "react-i18next";
import PostCard from "./PostCard";

type FeedContentProps = {
  posts: Post[] | undefined;
  users: User[] | undefined;
  isPending: boolean;
  error: Error | null;
  searchTerm: string;
};

const FeedContent = ({
  posts,
  users,
  isPending,
  error,
  searchTerm,
}: FeedContentProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "FEED_CONTENT" });
  const classes = useFeedStyles();

  if (isPending) {
    return <p className={classes.Message}>{t("LOADING")}</p>;
  }

  if (error) {
    return (
      <p className={`${classes.Message} ${classes.Error}`}>
        {t("LOAD_ERROR", { message: error.message })}
      </p>
    );
  }

  if (!posts?.length) {
    return (
      <p className={classes.Message}>
        {searchTerm.trim() ? t("NO_SEARCH_RESULTS") : t("NO_POSTS")}
      </p>
    );
  }

  return (
    <section className={classes.Feed} aria-label={t("POSTS_FEED_LABEL")}>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          author={getUserById(post.userId, users ?? [])}
        />
      ))}
    </section>
  );
};

export default FeedContent;
