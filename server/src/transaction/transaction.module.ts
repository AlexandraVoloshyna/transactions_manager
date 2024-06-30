import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  providers: [TransactionService, JwtService, UserService],
  controllers: [TransactionController],
})
export class TransactionModule {}
