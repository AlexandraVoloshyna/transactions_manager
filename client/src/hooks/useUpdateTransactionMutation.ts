import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { transactionService } from '@/services';
import { queryKeys } from '@/const';
import { UpdateTransaction } from '@/types';

export const useUpdateTransactionMutation = (
  data: UpdateTransaction,
  id: number,
) =>
  useMutation({
    mutationFn: () => transactionService.update(data, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactionKey] }),
  });
