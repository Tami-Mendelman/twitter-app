import type { FC } from "react";
import type { Post } from "../../../../libs/types/post.type.js";
import type { User } from "../../../../libs/types/user.type.js";
import { find, isEmpty, map, trim } from "lodash/fp";
import { useFeedContentStyles } from "./styles";
import PostCard from "./components/postCard";
import { useTranslation } from "react-i18next";
import type { FeedContentProps } from "./types";

const FeedContent: FC<FeedContentProps> = ({
  posts,
  users,
  isPending,
  error,
  searchTerm,
}: FeedContentProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "FEED_CONTENT" });
  const classes = useFeedContentStyles();

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
