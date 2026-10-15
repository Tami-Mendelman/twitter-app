import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from './post.functions';
import { getAllUsers } from './user.functions';

export const useFeedData = () => {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  return {
    posts: postsQuery.data,
    users: usersQuery.data,
    isPending: postsQuery.isPending || usersQuery.isPending,
    error: postsQuery.error ?? usersQuery.error,
  };
};