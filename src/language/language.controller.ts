import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDTO } from './dto/create-language.dto';
import { UpdateLanguageDTO } from './dto/update-language.dto';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  create(@Body() createLanguageDTO: CreateLanguageDTO) {
    return this.languageService.create(createLanguageDTO);
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDTO: UpdateLanguageDTO,
  ) {
    return this.languageService.update(id, updateLanguageDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(id);
  }
}
