import { capital, lower, sentence } from 'case';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';
import { WorkEntity } from './entities/work.entity';

export class WorkDTO {
  @IsString()
  name: string;

  @IsBoolean()
  featured: boolean;

  @IsArray()
  tech: string[];

  @IsString()
  details: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  github: string;

  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  live: string;

  @IsOptional()
  @IsString()
  image: string;

  formateData() {
    this.company = capital(this.company);
    this.name = sentence(this.name);
  }

  toEntity(id: string) {
    const entity = new WorkEntity();

    entity.id = id;
    entity.company = this.company;
    entity.date = this.date;
    entity.details = this.details;
    entity.featured = this.featured;
    entity.github = this.github;
    entity.github = this.github;
    entity.image = this.image;
    entity.live = this.live;
    entity.name = this.name;
    entity.tech = this.tech;

    return entity;
  }
}
