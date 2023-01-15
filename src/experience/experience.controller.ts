import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseMessage } from 'src/common/response';
import { ExperienceDTO } from './experience.dto';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private service: ExperienceService) {}

  @Post()
  public async create(@Body() expDTO: ExperienceDTO): Promise<ResponseMessage> {
    const experience = await this.service.create(expDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: experience,
    };

    return res;
  }

  @Get()
  public async findAll(): Promise<ResponseMessage> {
    const expriences = await this.service.findAll();

    const res: ResponseMessage = {
      statusCode: 201,
      data: expriences,
    };

    return res;
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseMessage> {
    const experience = await this.service.findOne(id);

    const res: ResponseMessage = {
      statusCode: 201,
      data: experience,
    };

    return res;
  }

  @Patch('/:id')
  public async edit(
    @Body() expDTO: ExperienceDTO,
    @Param('id') id: string,
  ): Promise<ResponseMessage> {
    const experience = await this.service.edit(id, expDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: experience,
    };

    return res;
  }

  @Delete('/:id')
  public async deleteSkill(@Param('id') id: string): Promise<ResponseMessage> {
    await this.service.delete(id);

    const res: ResponseMessage = {
      statusCode: 201,
      message: `experience with id ${id} deleted successfully`,
    };

    return res;
  }
}
