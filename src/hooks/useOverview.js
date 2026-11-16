import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview } from '../services/dashboardApi';

export const useOverview = () => {
  const { data: overview, isLoading, error } = useQuery({
    queryKey: ['dashboardOverview'],
    queryFn: getDashboardOverview,
  });

  return {
    overview,
    isLoading,
    error,
  };
};