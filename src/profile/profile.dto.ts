import { IsArray, IsString } from 'class-validator';
import { capital, sentence } from 'case';

export class ProfileDTO {
  @IsString()
  name: string;

  @IsString()
  caption: string;

  @IsArray()
  skills: string[];

  @IsString()
  bio: string;

  @IsString()
  about: string;

  formateData() {
    this.name = capital(this.name);
    this.caption = sentence(this.caption);
    this.clearSkills();
  }

  private clearSkills() {
    const skills = new Set(this.skills);
    const nSkills = [];

    skills.forEach((skill) => nSkills.push(capital(skill)));

    this.skills = nSkills;
  }
}
