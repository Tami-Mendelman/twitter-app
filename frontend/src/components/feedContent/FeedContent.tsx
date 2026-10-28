import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty, map, trim } from "lodash/fp";
import { useStyles } from "./styles";
import PostCard from "./components/postCard";
import type { FeedContentProps } from "./types";
import { useTranslation } from "react-i18next";
import contentService from "../../services/content";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { searchPostsByName } from "./functions";
import type { Post } from "@libs/types/post.type.js";

export const FeedContent: FC<FeedContentProps> = ({ searchTerm }) => {
  const { t } = useTranslation("translation", { keyPrefix: "FEED_CONTENT" });
  const classes = useStyles();

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: contentService.getAllPosts,
  });

const filteredPosts = searchPostsByName(searchTerm, posts ?? []);

  return (
    <>
      {isPending ? (
        <p className={classes.message}>{t("LOADING")}</p>
      ) : error ? (
        <p className={`${classes.message} ${classes.error}`}>
          {t("LOAD_ERROR", { message: error.message })}
        </p>
      ) : isEmpty(filteredPosts) ? (
        <p className={classes.message}>
          {trim(searchTerm) ? t("NO_SEARCH_RESULTS") : t("NO_POSTS")}
        </p>
      ) : (
        <div className={classes.feed}>
          {map((post: Post) => <PostCard key={post._id} post={post} />)(
            filteredPosts,
          )}
        </div>
      )}
    </>
  );
};


