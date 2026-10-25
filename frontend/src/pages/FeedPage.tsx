import type { FC } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { searchPostsByName } from './feedPage/functions';
import { useFeedStyles } from '../styles/feed.styles';
import FeedContent from '../components/FeedContent';
import contentService from '../services/content';
import userService from '../services/user';
import { QUERY_KEYS } from '../utils/queryKeys';

const FeedPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'FEED_PAGE' });
  const classes = useFeedStyles();
  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: contentService.getAllPosts,
  });
  const usersQuery = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = searchPostsByName(searchTerm, postsQuery.data ?? []);
  const isPending = postsQuery.isPending || usersQuery.isPending;
  const error = postsQuery.error ?? usersQuery.error;

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
        users={usersQuery.data}
        isPending={isPending}
        error={error}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default FeedPage;