import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { transactionService } from '@/services';
import { queryKeys } from '@/const';

export const useDeleteTransactionMutation = () =>
  useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactionKey] }),
  });
