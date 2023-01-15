import { HttpException, HttpStatus } from '@nestjs/common';
import { capital, sentence } from 'case';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
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

  @IsEnum(['Full Time', 'Part Time', 'Intern'], {
    message:
      'type must be one of the following values: Full Time | Part Time | Intern',
  })
  type: 'Full Time' | 'Part Time' | 'Intern';

  @IsOptional()
  @IsString()
  site: string;

  @IsDate()
  start: Date;

  @IsOptional()
  @IsDate()
  end: Date;

  @IsOptional()
  @IsBoolean()
  present: boolean;

  private endDate() {
    if (!this.end && !this.present) {
      throw new HttpException(
        'If you are not working at the company, please provide end date',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.end) {
      this.present = true;
    }

    if (this.present) {
      this.end = null;
    }
  }

  formateData() {
    this.company = capital(this.company);
    this.position = sentence(this.position);
  }

  validate() {
    const sDate = new Date(this.start);
    const eDate = new Date(this.end);

    this.endDate();

    if (sDate > eDate) {
      throw new HttpException(
        'End date shound be ahead of start date',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
