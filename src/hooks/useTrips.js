import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardTrips, deleteTrip } from '../services/dashboardApi';

export const useTrips = () => {
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading, error } = useQuery({
    queryKey: ['dashboardTrips'],
    queryFn: getDashboardTrips,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardTrips'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إلغاء/حذف الرحلة');
    },
  });

  return {
    trips,
    isLoading,
    error,
    deleteTrip: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};