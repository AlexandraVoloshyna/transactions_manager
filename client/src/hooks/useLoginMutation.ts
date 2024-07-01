import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import { User } from '@/types';
import { queryClient } from './queryClient';
import { queryKeys } from '@/const';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (user: User) => authService.login(user),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactionKey] }),
  });
