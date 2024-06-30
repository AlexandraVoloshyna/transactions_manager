import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/baseEntity/base.entity';
import { TransactionEntity } from 'src/transaction/transaction.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => TransactionEntity, entity => entity.owner, { cascade: true })
  products?: TransactionEntity[];
}
