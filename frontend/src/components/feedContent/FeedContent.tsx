import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@libs/types/post.type.js";
import { filter, includes, toLower, trim } from "lodash/fp";
import { useStyles } from "./styles";
import PostCard from "./components/postCard";
import type { FeedContentProps } from "./types";
import { useTranslation } from "react-i18next";
import contentService from "../../services/content";
import userService from "../../services/user";

const searchPostsByName = (searchTerm: string, posts: Post[]): Post[] => {
  const matchesPostName = (term: string) => (post: Post): boolean => {
    const normalizedSearchTerm = toLower(trim(term));
    const normalizedName = toLower(post.name);
    const nameSubstrings: Record<string, string> = Object.fromEntries(
      Array.from(
        {
          length: Math.max(
            0,
            normalizedName.length - normalizedSearchTerm.length + 1,
          ),
        },
        (_, index) => [
          index,
          normalizedName.slice(index, index + normalizedSearchTerm.length),
        ],
      ),
    );
    return includes<string>(normalizedSearchTerm)(nameSubstrings);
  };
  return trim(searchTerm)
    ? filter(matchesPostName(searchTerm))(posts)
    : posts;
};

export const FeedContent: FC<FeedContentProps> = ({ searchTerm }) => {
  const { t } = useTranslation("translation", { keyPrefix: "FEED_CONTENT" });
  const classes = useStyles();

  const {
    data: posts,
    isPending: isPendingPosts,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: contentService.getAllPosts,
  });

  const {
    isPending: isPendingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });

  const filteredPosts = searchPostsByName(searchTerm, posts ?? []);
  const isPending = isPendingPosts || isPendingUsers;
  const error = postsError ?? usersError;

  return (
    <>
      {isPending ? (
        <p className={classes.message}>{t("LOADING")}</p>
      ) : error ? (
        <p className={`${classes.message} ${classes.error}`}>
          {t("LOAD_ERROR", { message: error.message })}
        </p>
      ) : filteredPosts.length === 0 ? (
        <p className={classes.message}>
          {trim(searchTerm) ? t("NO_SEARCH_RESULTS") : t("NO_POSTS")}
        </p>
      ) : (
        <div className={classes.feed}>
          {filteredPosts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};


