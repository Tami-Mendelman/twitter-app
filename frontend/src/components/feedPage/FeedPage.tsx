import type { FC } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { filter, includes, toLower, trim } from 'lodash/fp';
import type { Post } from '../../../../libs/types/post.type.js';
import { useFeedStyles } from '../../styles/feed.styles';
import FeedContent from '../feedContent';
import contentService from '../../services/content';
import userService from '../../services/user';

const searchPostsByName = (searchTerm: string, posts: Post[]): Post[] => {
  const matchesPostName = (term: string) => (post: Post): boolean => {
    const normalizedSearchTerm = toLower(trim(term));
    const normalizedName = toLower(post.name);
    const nameSubstrings: Record<string, string> = Object.fromEntries(
      Array.from(
        {
          length: Math.max(0, normalizedName.length - normalizedSearchTerm.length + 1),
        },
        (_, index) => [index, normalizedName.slice(index, index + normalizedSearchTerm.length)],
      ),
    );
    return includes<string>(normalizedSearchTerm)(nameSubstrings);
  };
  return trim(searchTerm) ? filter(matchesPostName(searchTerm))(posts) : posts;
};

const FeedPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'FEED_PAGE' });
  const classes = useFeedStyles();
  const {
    data: posts,
    isPending: isPendingPosts,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: contentService.getAllPosts,
  });
  const {
    data: users,
    isPending: isPendingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = searchPostsByName(searchTerm, posts ?? []);
  const isPending = isPendingPosts || isPendingUsers;
  const error = postsError ?? usersError;

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>{t('TITLE')}</h1>
        <p className={classes.subtitle}>
          {t('SUBTITLE')}
        </p>
      </header>

      <input
        className={classes.searchInput}
        type="search"
        placeholder={t('SEARCH_PLACEHOLDER')}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        aria-label={t('SEARCH_LABEL')}
      />

      <FeedContent
        posts={filteredPosts}
        users={users}
        isPending={isPending}
        error={error}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default FeedPage;
