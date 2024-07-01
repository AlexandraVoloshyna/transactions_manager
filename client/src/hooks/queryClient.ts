import { QueryClient, keepPreviousData } from '@tanstack/react-query';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      placeholderData: keepPreviousData,
    },
  },
});
