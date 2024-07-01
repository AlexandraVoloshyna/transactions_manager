import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import { User } from '@/types';

export const useRegisterMutation = (user: User) =>
  useMutation({
    mutationFn: () => authService.register(user),
  });
