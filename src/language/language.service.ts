import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDTO } from './dto/create-language.dto';
import { UpdateLanguageDTO } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly rep: Repository<Language>,
  ) {}

  async create(createLanguageDTO: CreateLanguageDTO) {
    await this.rep.save(createLanguageDTO.languages);
    return `Languages: ${createLanguageDTO.toJson()} created successfully`;
  }

  findAll() {
    return this.rep.find();
  }

  findOne(id: string) {
    return this.rep.findOneBy({ id });
  }

  update(id: string, updateLanguageDTO: UpdateLanguageDTO) {
    // return this.rep.update(id, updateLanguageDTO);
    return 'Update';
  }

  remove(id: string) {
    return this.rep.delete(id);
  }
}
