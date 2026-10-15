import filter from 'lodash/fp/filter.js';
import flow from 'lodash/fp/flow.js';
import startsWith from 'lodash/fp/startsWith.js';
import toLower from 'lodash/fp/toLower.js';
import trim from 'lodash/fp/trim.js';
import type { Post } from '../types/models.types';

const normalizePostName = flow(trim, toLower);

const createPostNameMatcher = (searchTerm: string) => {
  const matchesPostName = (post: Post): boolean => {
    const normalizedPostName = normalizePostName(post.name);

    return startsWith(searchTerm, normalizedPostName);
  };

  return matchesPostName;
};

export const searchPostsByName = (
  searchTerm: string,
  posts: Post[],
): Post[] => {
  const normalizedSearchTerm = normalizePostName(searchTerm);
  const hasSearchTerm = Boolean(normalizedSearchTerm);
  const matchesPostName = createPostNameMatcher(normalizedSearchTerm);
  const filteredPosts = filter(matchesPostName, posts);

  return hasSearchTerm ? filteredPosts : posts;
};