import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkEntity } from './entities/work.entity';
import { WorkDTO } from './work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkEntity)
    private readonly repo: Repository<WorkEntity>,
  ) {}

  public async create(workDTO: WorkDTO): Promise<WorkEntity> {
    workDTO.formateData();

    return this.repo.save(workDTO);
  }

  public async edit(id: string, workDTO: WorkDTO): Promise<WorkEntity> {
    try {
      workDTO.formateData();

      const editWork = await this.repo.findOneBy({ id });

      if (!editWork) {
        throw new NotFoundException('Work not found!');
      }

      this.repo.update(id, workDTO);

      return workDTO.toEntity(id);
    } catch (error) {
      throw new HttpException(
        'Work data already exist!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<WorkEntity[]> {
    return await this.repo.find();
  }

  public async findOne(id: string): Promise<WorkEntity> {
    const foundWork = await this.repo.findOneBy({ id });

    if (!foundWork) {
      throw new NotFoundException('Work not found!');
    }
    return foundWork;
  }

  public async delete(id: string): Promise<WorkEntity> {
    const foundWork = await this.repo.findOneBy({ id });

    if (!foundWork) {
      throw new NotFoundException('Work not found!');
    }

    await this.repo.delete(id);

    return foundWork;
  }
}
