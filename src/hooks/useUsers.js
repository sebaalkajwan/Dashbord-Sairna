import { useQuery } from '@tanstack/react-query';
import { getDashboardUsers } from '../services/dashboardApi';

export const useUsers = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['dashboardUsers'],
    queryFn: getDashboardUsers,
  });

  return {
    users,
    isLoading,
    error,
  };
};