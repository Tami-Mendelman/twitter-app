import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFeedData } from '../functions';
import { searchPostsByName } from '../functions/post-search.functions';
import { useFeedStyles } from '../styles/feed.styles';
import FeedContent from '../components/FeedContent';

const FeedPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'FEED_PAGE' });
  const classes = useFeedStyles();
  const { posts, users, isPending, error } = useFeedData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => setSearchTerm(event.currentTarget.value);

  const filteredPosts = searchPostsByName(searchTerm, posts ?? []);

  return (
    <main className={classes.Page}>
      <header className={classes.Header}>
        <h1 className={classes.Title}>{t('TITLE')}</h1>
        <p className={classes.Subtitle}>
          {t('SUBTITLE')}
        </p>
      </header>

      <input
        className={classes.SearchInput}
        type="search"
        placeholder={t('SEARCH_PLACEHOLDER')}
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label={t('SEARCH_LABEL')}
      />

      <FeedContent
        posts={filteredPosts}
        users={users}
        isPending={isPending}
        error={error}
        searchTerm={searchTerm}
      />
    </main>
  );
};

export default FeedPage;