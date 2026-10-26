import { filter, includes, toLower, trim } from 'lodash/fp';
import type { Post } from '@libs/types/post.type.js';

export const searchPostsByName = (
  searchTerm: string,
  posts: Post[],
): Post[] =>
  trim(searchTerm)
    ? filter(
        (post: Post) =>
          includes<string>(toLower(trim(searchTerm)))(toLower(post.name)),
      )(posts)
    : posts;
