import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { EStatus } from 'src/enums/status.enum';
import { EType } from 'src/enums/type.enum';

export class CreateDto {
  @IsString()
  @Transform(({ value }) => {
    return String(value);
  })
  client_name: string;

  @IsString()
  @Transform(({ value }) => {
    return String(value);
  })
  status: EStatus;

  @IsString()
  @Transform(({ value }) => {
    return String(value);
  })
  type: EType;

  @IsString()
  amount: string;
}
