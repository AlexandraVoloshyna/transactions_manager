import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { transactionService } from '@/services';
import { queryKeys } from '@/const';
import { TransactionWithoutId } from '@/types';

export const useCreateTransactionMutation = (data: TransactionWithoutId) =>
  useMutation({
    mutationFn: () => transactionService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactionKey] }),
  });
