import { EStatus, EType } from '@/enums';

export interface IResponse<T> {
  data?: T;
  message: string;
}

export interface User {
  email: string;
  password: string;
}
export interface Transaction {
  id: number;
  client_name: string;
  status: EStatus;
  type: EType;
  amount: string;
}
export interface TransactionWithPagination {
  transactions: Transaction[];
  totalPages: number;
}
export type TransactionWithoutId = Omit<Transaction, 'id'>;

export type UpdateTransaction = Partial<TransactionWithoutId>;
