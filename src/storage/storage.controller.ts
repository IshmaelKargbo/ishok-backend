import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/common/response';
import { BufferedFile } from 'src/minio-client/file.model';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storage: StorageService) {}

  @Post('work-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  public async upload(
    @Param('id') id: string,
    @UploadedFile() image: BufferedFile,
  ): Promise<ResponseMessage> {
    const work = await this.storage.uploadSingle(id, image);

    const res: ResponseMessage = {
      statusCode: 201,
      data: work,
    };

    return res;
  }
}
