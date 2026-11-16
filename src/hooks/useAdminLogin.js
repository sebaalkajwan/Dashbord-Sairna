import { useMutation } from '@tanstack/react-query';
import { adminLogin } from '../services/dashboardApi';
import { useNavigate } from 'react-router-dom';

export const useAdminLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: () => {
      navigate('/dashboard/overview');
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.response?.data?.message || loginMutation.error?.message,
  };
};