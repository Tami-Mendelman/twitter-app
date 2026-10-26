import type { Post } from "../../../../../../libs/types/post.type.js";
import type { User } from "../../../../../../libs/types/user.type.js";

export type PostCardProps = {
  post: Post;
  author?: User;
};
