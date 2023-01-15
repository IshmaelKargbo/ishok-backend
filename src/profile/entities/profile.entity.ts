import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  caption: string;

  @Column({ type: 'jsonb' })
  skills: string[];

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text' })
  about: string;
}
