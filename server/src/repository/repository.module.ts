import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';

const repositories = [UserRepository, TransactionRepository];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
