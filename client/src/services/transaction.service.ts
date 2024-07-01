import { apiTransaction } from '@/const';
import axios from './config';
import {
  IResponse,
  Transaction,
  TransactionWithoutId,
  UpdateTransaction,
} from '@/types';

class TransactionService {
  async getAll(query: string): Promise<IResponse<Transaction[]> | undefined> {
    try {
      const response = await axios.get(`${apiTransaction}${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async create(
    data: TransactionWithoutId,
  ): Promise<IResponse<void> | undefined> {
    try {
      const response = await axios.post(apiTransaction.transaction, data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async update(
    data: UpdateTransaction,
    id: number,
  ): Promise<IResponse<void> | undefined> {
    try {
      const response = await axios.patch(
        `${apiTransaction.transaction}/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async delete(id: number): Promise<IResponse<void> | undefined> {
    try {
      const response = await axios.delete(
        `${apiTransaction.transaction}/${id}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const transactionService = new TransactionService();
