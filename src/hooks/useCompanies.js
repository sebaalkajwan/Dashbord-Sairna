import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardCompanies, createCompany, deleteCompany } from '../services/dashboardApi';

export const useCompanies = () => {
  const queryClient = useQueryClient();

  const { data: companies = [], isLoading, error } = useQuery({
    queryKey: ['dashboardCompanies'],
    queryFn: getDashboardCompanies,
  });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCompanies'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إضافة الشركة');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCompanies'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل حذف الشركة');
    },
  });

  return {
    companies,
    isLoading,
    error,
    createCompany: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteCompany: deleteMutation.mutate,
  };
};