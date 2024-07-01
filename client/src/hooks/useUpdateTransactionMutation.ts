import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { transactionService } from '@/services';
import { queryKeys } from '@/const';
import { UpdateTransaction } from '@/types';
interface UpdateTransactionParams {
  data: UpdateTransaction;
  id: number;
}

export const useUpdateTransactionMutation = () =>
  useMutation({
    mutationFn: ({ data, id }: UpdateTransactionParams) =>
      transactionService.update(data, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactionKey] }),
  });
