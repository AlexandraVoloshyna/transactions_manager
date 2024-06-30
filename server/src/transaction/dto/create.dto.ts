import { IsNumber, IsPositive, IsString } from 'class-validator';
import { EStatus } from 'src/enums/status.enum';
import { EType } from 'src/enums/type.enum';

export class CreateDto {
  @IsString()
  client_name: string;

  @IsString()
  status: EStatus;

  @IsString()
  type: EType;

  @IsPositive()
  @IsNumber()
  amount: number;
}
