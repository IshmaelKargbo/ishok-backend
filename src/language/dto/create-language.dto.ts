import { IsArray, IsNotEmpty } from 'class-validator';
import { Language } from '../entities/language.entity';

export class CreateLanguageDTO implements Readonly<CreateLanguageDTO> {
  @IsNotEmpty()
  @IsArray()
  languages: Array<Language>;

  public toJson() {
    const langs = [];
    this.languages.forEach((e: Language) => langs.push(e.name));
    return langs;
  }
}
