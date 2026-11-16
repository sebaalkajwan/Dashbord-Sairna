import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardCities, createCity, deleteCity } from '../services/dashboardApi';

export const useCities = () => {
  const queryClient = useQueryClient();

  const { data: citiesData, isLoading, error } = useQuery({
    queryKey: ['dashboardCities'],
    queryFn: getDashboardCities,
  });

  const cities = Array.isArray(citiesData) ? citiesData : citiesData?.data || [];

  const addMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCities'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إضافة المدينة');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCities'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'لا يمكن حذف هذه المدينة لارتباطها برحلات');
    },
  });

  return {
    cities,
    isLoading,
    error,
    addCity: addMutation.mutate,
    isAdding: addMutation.isPending,
    deleteCity: deleteMutation.mutate,
  };
};