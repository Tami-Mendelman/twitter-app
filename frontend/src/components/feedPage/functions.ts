import { filter, includes, toLower, trim } from 'lodash/fp';
import type { Post } from '../../../../libs/types/post.type.js';

const matchesPostName = (searchTerm: string) => (post: Post): boolean => {
  const normalizedSearchTerm = toLower(trim(searchTerm));
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

export const searchPostsByName = (
  searchTerm: string,
  posts: Post[],
): Post[] =>
  trim(searchTerm)
    ? filter(matchesPostName(searchTerm))(posts)
    : posts;
