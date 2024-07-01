import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import { User } from '@/types';

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (user: User) => authService.register(user),
  });
