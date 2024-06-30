import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/transaction.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor() {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [UserEntity, TransactionEntity],
    };
  }
}
