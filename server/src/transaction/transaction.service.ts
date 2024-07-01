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

  public async createTransactions(dto: CreateDto[], userId: number) {
    await this.transactionRepository.createMany(dto, userId);
  }

  public async updateTransaction(id: number, dto: Partial<CreateDto>) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    const updatedTransaction = {
      client_name: dto.client_name || transaction.client_name,
      status: dto.status || transaction.status,
      type: dto.type || transaction.type,
      amount: dto.amount || transaction.amount,
    };
    await this.transactionRepository.update(id, updatedTransaction);
  }

  public async deleteTransaction(id: number) {
    await this.transactionRepository.delete(id);
  }
}
