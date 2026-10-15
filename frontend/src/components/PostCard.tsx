import type { Post, User } from '../types/models.types';
import { usePostStyles } from '../styles/post.styles';
import { Link } from 'react-router-dom';

type PostCardProps = {
  post: Post;
  author: User | undefined;
};

const PostCard = ({ post, author }: PostCardProps) => {
  const classes = usePostStyles();

  return (
    <article className={classes.Card}>
      <p className={classes.Author}>
        {author?.displayName ?? 'Unknown user'}
      </p>

      <p className={classes.Username}>
        {author ? `@${author.username}` : 'User unavailable'}
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
          View media
        </a>
      ) : null}

      <div className={classes.Footer}>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : 'Date unavailable'}
        </span>
        <span>{post.likes ?? 0} likes</span>
        <Link to={`/posts/${post._id}/edit`}>Edit</Link>
      </div>
    </article>
  );
};

export default PostCard;