import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDTO } from './dto/create-skill.dto';
import { SkillEntity } from './entities/skill.entity';

@Controller('skill')
export class SkillController {
  constructor(private service: SkillService) {}

  @Post()
  public async createSkill(
    @Body() createSkillDto: CreateSkillDTO,
  ): Promise<SkillEntity> {
    const skill = await this.service.create(createSkillDto);
    return skill;
  }

  @Get()
  public async getSkills(): Promise<SkillEntity[]> {
    const skills = await this.service.findAll();
    return skills;
  }

  @Get('/:id')
  public async getSkill(@Param('id') id: string) {
    const skill = await this.service.findOne(id);
    return skill;
  }

  @Patch('/:id')
  public async editSkill(
    @Body() createSkillDto: CreateSkillDTO,
    @Param('id') id: string,
  ): Promise<SkillEntity> {
    const skill = await this.service.edit(id, createSkillDto);
    return skill;
  }

  @Delete('/:id')
  public async deleteSkill(@Param('id') id: string) {
    const deletedSkill = await this.service.delete(id);
    return deletedSkill;
  }
}
