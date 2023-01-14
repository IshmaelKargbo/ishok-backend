import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDTO } from './dto/create-skill.dto';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private repository: Repository<SkillEntity>,
  ) {}

  public async create(createSkillDto: CreateSkillDTO): Promise<SkillEntity> {
    const checkSkill = await this.repository.findOneBy({
      name: createSkillDto.name,
    });

    if (checkSkill) {
      throw new HttpException(
        'Skill all ready exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.repository.save(createSkillDto);
  }

  public async findAll(): Promise<SkillEntity[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<SkillEntity> {
    const foundSkill = await this.repository.findOneBy({ id });
    if (!foundSkill) {
      throw new NotFoundException('Skill not found');
    }
    return foundSkill;
  }

  public async edit(
    id: string,
    createSkillDto: CreateSkillDTO,
  ): Promise<SkillEntity> {
    const editSkill = await this.repository.findOneBy({ id });

    if (!editSkill) {
      throw new NotFoundException('Skill not found');
    }

    editSkill.name = createSkillDto.name;

    await this.repository.update(id, editSkill);

    return editSkill;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
