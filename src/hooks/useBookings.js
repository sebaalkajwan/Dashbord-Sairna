import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardBookings, cancelBooking } from '../services/dashboardApi';

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['dashboardBookings'],
    queryFn: getDashboardBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardBookings'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إلغاء الحجز');
    },
  });

  return {
    bookings,
    isLoading,
    error,
    cancelBooking: cancelMutation.mutate,
    isCancelling: cancelMutation.isPending,
  };
};