import { queryKeys } from '@/const';
import { transactionService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetTransactionQuery = (
  page: number,
  limit: number,
  status: string,
  search: string,
  type: string,
) =>
  useQuery({
    queryKey: [queryKeys.transactionKey, page, limit, status, search, type],
    queryFn: () => transactionService.getAll(page, limit, status, search, type),
  });
