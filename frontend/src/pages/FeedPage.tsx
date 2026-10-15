import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useFeedData } from '../functions';
import { searchPostsByName } from '../functions/post-search.functions';
import { useFeedStyles } from '../styles/feed.styles';
import FeedContent from '../components/FeedContent';

const FeedPage = () => {
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
        <h1 className={classes.Title}>Twitter Clone</h1>
        <p className={classes.Subtitle}>
          Latest posts from your community
        </p>
      </header>

      <input
        className={classes.SearchInput}
        type="search"
        placeholder="Search posts by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search posts by name"
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