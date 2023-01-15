import { IsOptional } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
export class ExperienceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  company: string;

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'jsonb' })
  duities: string[];

  @Column({ type: 'varchar', nullable: true })
  site: string;

  @Column({
    type: 'enum',
    enum: ['Full Time', 'Part Time', 'Intern'],
  })
  type: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp', nullable: true })
  end: Date;

  @Column({ type: 'boolean', default: false })
  present: boolean;
}
