import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Param,
  Body,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TransactionService } from './transaction.service';
import { GetAllDto } from './dto/get-all.dto';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/user/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetAllDto, @Req() request: RequestWithUser) {
    const userId = request.user.id;
    const data = await this.transactionService.getAllTransactions(
      query,
      userId,
    );
    return { message: 'transactions fetched successfully', data };
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateDto) {
    await this.transactionService.createTransactions(createDto);
    return { message: 'transaction created successfully' };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateDto: Partial<CreateDto>,
  ) {
    await this.transactionService.updateTransaction(id, updateDto);
    return { message: 'transaction updated successfully' };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseUUIDPipe) id: number) {
    await this.transactionService.deleteTransaction(id);
    return { message: 'transaction deleted successfully' };
  }
}
