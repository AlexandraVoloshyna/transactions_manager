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
  amount: number;
}
export type TransactionWithoutId = Omit<Transaction, 'id'>;

export type UpdateTransaction = Partial<TransactionWithoutId>;
