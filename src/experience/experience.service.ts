import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './entities/experience.entity';
import { ExperienceDTO } from './experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private readonly repo: Repository<ExperienceEntity>,
  ) {}

  public async create(expDTO: ExperienceDTO): Promise<ExperienceEntity> {
    expDTO.validate();
    expDTO.formateData();

    return this.repo.save(expDTO);
  }

  public edit(id: string, expDTO: ExperienceDTO): Promise<ExperienceEntity> {
    try {
      expDTO.validate();
      expDTO.formateData();

      let editExp = this.repo.findOneBy({ id });

      if (!editExp) {
        throw new NotFoundException('Exprience not found!');
      }

      this.repo.update(id, expDTO);

      editExp = { ...editExp, ...expDTO };

      return editExp;
    } catch (error) {
      throw new HttpException(
        'Exprience data already exist!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<ExperienceEntity[]> {
    return await this.repo.find();
  }

  public async findOne(id: string): Promise<ExperienceEntity> {
    const foundExp = await this.repo.findOneBy({ id });

    if (!foundExp) {
      throw new NotFoundException('Exprience not found!');
    }
    return foundExp;
  }

  public async delete(id: string): Promise<ExperienceEntity> {
    const foundExp = await this.repo.findOneBy({ id });

    if (!foundExp) {
      throw new NotFoundException('Exprience not found!');
    }

    await this.repo.delete(id);

    return foundExp;
  }
}
