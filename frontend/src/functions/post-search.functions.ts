import { filter, toLower, trim } from 'lodash/fp';
import type { Post  } from '../types/models.types';


const matchesPostName = (searchTerm: string) => (post: Post): boolean =>
  toLower(post.name).includes(toLower(trim(searchTerm)));

export const searchPostsByName = (
  searchTerm: string,
  posts: Post[],
): Post[] =>
  trim(searchTerm)
    ? filter(matchesPostName(searchTerm))(posts)
    : posts;