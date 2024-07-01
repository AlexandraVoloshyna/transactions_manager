import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { EStatus } from 'src/enums/status.enum';
import { EType } from 'src/enums/type.enum';

export class GetAllDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  status: EStatus;

  @IsOptional()
  @IsString()
  type: EType;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @IsPositive()
  page: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsPositive()
  @IsNumber()
  limit: number;
}
