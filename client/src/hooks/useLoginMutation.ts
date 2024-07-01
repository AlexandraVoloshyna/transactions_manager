import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import { User } from '@/types';

export const useLoginMutation = (user: User) =>
  useMutation({
    mutationFn: () => authService.login(user),
  });
