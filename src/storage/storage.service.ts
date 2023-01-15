import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { WorkEntity } from 'src/work/entities/work.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class StorageService {
  constructor(
    private minioClientService: MinioClientService,
    @InjectRepository(WorkEntity)
    private readonly work: Repository<WorkEntity>,
  ) {}

  async uploadSingle(id: string, image: BufferedFile) {
    try {
      const editWork = await this.work.findOneBy({ id });

      if (!editWork) {
        throw new NotFoundException('Work not found!');
      }

      const { url } = await this.minioClientService.upload(image);

      this.work.update(id, { image: url });

      editWork.image = url;

      return editWork;
    } catch (error) {
      throw new HttpException(
        'Work data already exist!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
