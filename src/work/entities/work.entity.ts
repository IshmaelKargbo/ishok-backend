import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work')
export class WorkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Column({ type: 'jsonb' })
  tech: string[];

  @Column({ type: 'text' })
  details: string;

  @Column({ type: 'varchar', nullable: true })
  company: string;

  @Column({ type: 'varchar', nullable: true })
  github: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', nullable: true })
  live: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;
}
