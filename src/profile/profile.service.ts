import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileDTO } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private repo: Repository<ProfileEntity>,
  ) {}

  public async create(profileDTO: ProfileDTO): Promise<ProfileEntity> {
    profileDTO.formateData();

    return this.repo.save(profileDTO);
  }

  public edit(id: string, profileDTO: ProfileDTO): Promise<ProfileEntity> {
    try {
      profileDTO.formateData();

      let editProfile = this.repo.findOneBy({ id });

      if (!editProfile) {
        throw new NotFoundException('Profile not found!');
      }

      this.repo.update(id, profileDTO);

      editProfile = { ...editProfile, ...profileDTO };

      return editProfile;
    } catch (error) {
      throw new HttpException(
        'Profile data already exist!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<ProfileEntity[]> {
    return await this.repo.find();
  }

  public async findOne(id: string): Promise<ProfileEntity> {
    const foundProfile = await this.repo.findOneBy({ id });

    if (!foundProfile) {
      throw new NotFoundException('Profile not found!');
    }
    return foundProfile;
  }

  public async delete(id: string): Promise<ProfileEntity> {
    const foundProfile = await this.repo.findOneBy({ id });

    if (!foundProfile) {
      throw new NotFoundException('Profile not found!');
    }

    await this.repo.delete(id);

    return foundProfile;
  }
}
