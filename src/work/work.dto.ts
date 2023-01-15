import { capital, lower, sentence } from 'case';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
