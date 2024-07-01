import { queryKeys } from '@/const';
import { transactionService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetTransactionQuery = (query: string) =>
  useQuery({
    queryKey: [queryKeys.transactionKey],
    queryFn: () => transactionService.getAll(query),
    refetchOnMount: true,
  });
