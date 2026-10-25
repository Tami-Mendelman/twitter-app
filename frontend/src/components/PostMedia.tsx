import { useTranslation } from 'react-i18next';
import { getPostMediaType } from '../functions/post-media.functions';
import { usePostStyles } from '../styles/post.styles';
import type { PostMediaProps } from '../types/post-media.types';

const PostMedia = ({ media, postName }: PostMediaProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'POST_CARD' });
  const classes = usePostStyles();
  const mediaType = getPostMediaType(media);

  return mediaType === 'image' ? (
    <img className={classes.Image} src={media} alt={t('IMAGE_ALT', { name: postName })} />
  ) : mediaType === 'pdf' ? (
    <section className={classes.Pdf}>
      <iframe
        className={classes.PdfViewer}
        src={media}
        title={t('PDF_TITLE', { name: postName })}
        loading="lazy"
      />
      <a className={classes.Media} href={media} target="_blank" rel="noopener noreferrer">
        {t('OPEN_PDF')}
      </a>
    </section>
  ) : (
    <a className={classes.Media} href={media} target="_blank" rel="noopener noreferrer">
      {t('VIEW_MEDIA')}
    </a>
  );
};

export default PostMedia;
