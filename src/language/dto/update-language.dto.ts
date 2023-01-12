import { PartialType } from '@nestjs/swagger';
import { CreateLanguageDTO } from './create-language.dto';

export class UpdateLanguageDTO extends PartialType(CreateLanguageDTO) {}
