import type { Post, User } from '../types/models.types';
import { usePostStyles } from '../styles/post.styles';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './auth-context';

type PostCardProps = {
  post: Post;
  author: User | undefined;
};

const PostCard = ({ post, author }: PostCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'POST_CARD' });
  const classes = usePostStyles();
  const { user } = useAuth();

  return (
    <article className={classes.Card}>
      <p className={classes.Author}>
        {author?.displayName ?? t('UNKNOWN_USER')}
      </p>

      <p className={classes.Username}>
        {author ? `@${author.username}` : t('USER_UNAVAILABLE')}
      </p>

      <h2 className={classes.Name}>{post.name}</h2>

      <p className={classes.Text}>{post.text}</p>

      {post.media ? (
        <a
          className={classes.Media}
          href={post.media}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('VIEW_MEDIA')}
        </a>
      ) : null}

      <div className={classes.Footer}>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString('he-IL')
            : t('DATE_UNAVAILABLE')}
        </span>
        <span>{t('LIKES', { count: post.likes ?? 0 })}</span>
        {user?._id === post.userId ? (
          <Link to={`/posts/${post._id}/edit`}>{t('EDIT')}</Link>
        ) : null}
      </div>
    </article>
  );
};

export default PostCard;