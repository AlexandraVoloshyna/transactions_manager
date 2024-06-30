import { BaseEntity } from 'src/baseEntity/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class TransactionEntity extends BaseEntity {
  @Column()
  type: string;

  @Column()
  client_name: string;

  @Column()
  status: string;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, entity => entity.products)
  owner?: UserEntity;
}
