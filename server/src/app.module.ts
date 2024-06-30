import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RepositoryModule,
    DatabaseModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
