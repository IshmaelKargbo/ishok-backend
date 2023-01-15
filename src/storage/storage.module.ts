import { Module } from '@nestjs/common';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { WorkEntity } from 'src/work/entities/work.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MinioClientModule, TypeOrmModule.forFeature([WorkEntity])],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
