import { IsString } from 'class-validator';

export class CreateSkillDTO {
  @IsString()
  name: string;
}
