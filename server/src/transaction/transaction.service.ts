import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/repository/transaction.repository';
import { GetAllDto } from './dto/get-all.dto';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async getAllTransactions(dto: GetAllDto, userId: number) {
    return await this.transactionRepository.getAllTransactions(dto, userId);
  }

  public async createTransactions(dto: CreateDto) {
    const transactions = this.transactionRepository.create(dto);
    await this.transactionRepository.save(transactions);
  }

  public async updateTransaction(id: number, dto: Partial<CreateDto>) {
    await this.transactionRepository.update(id, dto);
  }

  public async deleteTransaction(id: number) {
    await this.transactionRepository.delete(id);
  }
}
