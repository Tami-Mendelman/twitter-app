import type { Post, User } from "../types/models.types";
import { getUserById } from "../functions/user.functions";
import { useFeedStyles } from "../styles/feed.styles";
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
  const classes = useFeedStyles();

  if (isPending) {
    return <p className={classes.Message}>Loading posts...</p>;
  }

  if (error) {
    return (
      <p className={`${classes.Message} ${classes.Error}`}>
        Failed to load the feed: {error.message}
      </p>
    );
  }

  if (!posts?.length) {
    return (
      <p className={classes.Message}>
        {searchTerm.trim() ? "No posts match your search." : "No posts yet."}
      </p>
    );
  }

  return (
    <section className={classes.Feed} aria-label="Posts feed">
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
