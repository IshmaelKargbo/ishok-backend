import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Language extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
