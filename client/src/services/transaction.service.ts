import { apiTransaction } from '@/const';
import axios from './config';

class TransactionService {
  async getAll(query: string) {
    const response = await axios.get(`${apiTransaction}${query}`);
    return response.data;
  }

  async create<T>(data: T) {
    const response = await axios.post(apiTransaction.transaction, data);
    return response.data;
  }

  async update<T>(data: T, id: number) {
    const response = await axios.patch(
      `${apiTransaction.transaction}/${id}`,
      data,
    );
    return response.data;
  }

  async delete(id: number) {
    const response = await axios.delete(`${apiTransaction.transaction}/${id}`);
    return response.data;
  }
}

export const transactionService = new TransactionService();
