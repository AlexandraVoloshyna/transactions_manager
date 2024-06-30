import { Injectable } from '@nestjs/common';
import { GetAllDto } from 'src/transaction/dto/get-all.dto';
import { TransactionEntity } from 'src/transaction/transaction.entity';
import { Brackets, DataSource, Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends Repository<TransactionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TransactionEntity, dataSource.manager);
  }
  public async getAllTransactions(dto: GetAllDto, userId: number) {
    const { page = 1, limit, search = '', type, status } = dto;

    const queryBuilder = this.createQueryBuilder('transactions');

    if (search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('transaction.client_name LIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('transaction.type LIKE :search', { search: `%${search}%` })
            .orWhere('transaction.status LIKE :search', {
              search: `%${search}%`,
            });
        }),
      );
    }

    if (type) {
      queryBuilder.andWhere('transactions.type = :type', { type });
    }

    if (status) {
      queryBuilder.andWhere('transactions.status = :status', { status });
    }

    if (userId) {
      queryBuilder.andWhere('transactions.ownerId = :userId', { userId });
    }

    queryBuilder
      .orderBy('transactions.created_at', 'ASC')
      .skip(limit ? (page - 1) * limit : 0)
      .take(limit);

    const [transactions, totalCount] = await queryBuilder.getManyAndCount();
    const totalPages = totalCount / limit;

    return { totalPages, transactions };
  }
}
