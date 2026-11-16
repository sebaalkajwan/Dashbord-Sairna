import { useQuery } from '@tanstack/react-query';
import { getAdminProfile } from '../services/dashboardApi';

export const useAdminProfile = () => {
  const { data: admin, isLoading, error } = useQuery({
    queryKey: ['adminProfile'],
    queryFn: getAdminProfile,
    staleTime: 1000 * 60 * 5, 
  });

  return {
    admin,
    isLoading,
    error,
  };
};