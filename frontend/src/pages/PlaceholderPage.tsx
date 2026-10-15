import { useTranslation } from 'react-i18next';

type PlaceholderPageProps = {
  title: string;
};

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'PLACEHOLDER_PAGE',
  });

  return (
    <main>
      <h1>{title}</h1>
      <p>{t('MESSAGE')}</p>
    </main>
  );
};

export default PlaceholderPage;
