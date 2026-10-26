import type { Post } from "../../../../libs/types/post.type.js";
import type { User } from "../../../../libs/types/user.type.js";

export type FeedContentProps = {
  posts?: Post[];
  users?: User[];
  isPending: boolean;
  error: Error | null;
  searchTerm: string;
};
