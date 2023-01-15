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
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Post()
  public async create(
    @Body() profileDTO: ProfileDTO,
  ): Promise<ResponseMessage> {
    const profile = await this.service.create(profileDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: profile,
    };

    return res;
  }

  @Get()
  public async findAll(): Promise<ResponseMessage> {
    const profiles = await this.service.findAll();

    const res: ResponseMessage = {
      statusCode: 201,
      data: profiles,
    };

    return res;
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseMessage> {
    const profile = await this.service.findOne(id);

    const res: ResponseMessage = {
      statusCode: 201,
      data: profile,
    };

    return res;
  }

  @Patch('/:id')
  public async edit(
    @Body() profileDTO: ProfileDTO,
    @Param('id') id: string,
  ): Promise<ResponseMessage> {
    const profile = await this.service.edit(id, profileDTO);

    const res: ResponseMessage = {
      statusCode: 201,
      data: profile,
    };

    return res;
  }

  @Delete('/:id')
  public async deleteSkill(@Param('id') id: string): Promise<ResponseMessage> {
    await this.service.delete(id);

    const res: ResponseMessage = {
      statusCode: 201,
      message: `profile with id ${id} deleted successfully`,
    };

    return res;
  }
}
