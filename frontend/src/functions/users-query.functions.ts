import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from './user.functions';

export const useUsersData = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });