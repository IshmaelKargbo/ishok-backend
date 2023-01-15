import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/common/response';
import { BufferedFile } from 'src/minio-client/file.model';
import { StorageService } from 'src/storage/storage.service';
import { WorkDTO } from './work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private service: WorkService) {}

  @Post()
  public async create(@Body() workDTO: WorkDTO): Promise<ResponseMessage> {
    const work = await this.service.create(workDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: work,
    };

    return res;
  }

  @Get()
  public async findAll(): Promise<ResponseMessage> {
    const works = await this.service.findAll();

    const res: ResponseMessage = {
      statusCode: 201,
      data: works,
    };

    return res;
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseMessage> {
    const work = await this.service.findOne(id);

    const res: ResponseMessage = {
      statusCode: 201,
      data: work,
    };

    return res;
  }

  @Patch('/:id')
  public async edit(
    @Body() expDTO: WorkDTO,
    @Param('id') id: string,
  ): Promise<ResponseMessage> {
    const work = await this.service.edit(id, expDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: work,
    };

    return res;
  }

  @Delete('/:id')
  public async deleteSkill(@Param('id') id: string): Promise<ResponseMessage> {
    await this.service.delete(id);

    const res: ResponseMessage = {
      statusCode: 201,
      message: `work with id ${id} deleted successfully`,
    };

    return res;
  }
}
