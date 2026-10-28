import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FeedContent from '../feedContent';

export const FeedPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'FEED_PAGE' });
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <header>
        <h1>{t('TITLE')}</h1>
        <p>{t('SUBTITLE')}</p>
      </header>

      <input
        type="search"
        placeholder={t('SEARCH_PLACEHOLDER')}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        aria-label={t('SEARCH_LABEL')}
      />

      <FeedContent searchTerm={searchTerm} />
    </>
  );
};
