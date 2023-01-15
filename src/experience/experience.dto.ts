import { HttpException, HttpStatus } from '@nestjs/common';
import { capital, sentence } from 'case';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class ExperienceDTO {
  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsArray()
  duities: string[];

  @IsOptional()
  @IsString()
  site: string;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsOptional()
  @IsBoolean()
  present: boolean;

  formateData() {
    this.company = capital(this.company);
    this.position = sentence(this.position);
  }

  validate() {
    const sDate = new Date(this.start);
    const eDate = new Date(this.end);

    if (sDate > eDate) {
      throw new HttpException(
        'End date shound be ahead of start date',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
