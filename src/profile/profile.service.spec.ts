import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';

const profile: ProfileEntity = plainToClass(ProfileEntity, {
  id: 1,
  name: 'Ishmael Kargbo',
  caption: 'Let’s design that future together',
  skills: [
    'C#',
    'Python',
    'Java Script',
    'Node Js',
    'React',
    'React Native',
    'Go Lang',
  ],
  bio: 'I am a Full-stack developer specializing in building',
  about: 'Hello! My name is Ishmael and I enjoy creating things that live',
});

const profileDTO: ProfileDTO = plainToClass(ProfileDTO, {
  id: 1,
  name: 'Ishmael Kargbo',
  caption: 'Let’s design that future together',
  skills: [
    'C#',
    'Python',
    'Java Script',
    'Node Js',
    'React',
    'React Native',
    'Go Lang',
  ],
  bio: 'I am a Full-stack developer specializing in building',
  about: 'Hello! My name is Ishmael and I enjoy creating things that live',
});

const oneProfile: ProfileEntity = plainToClass(ProfileEntity, profile);

const editProfile: ProfileEntity = plainToClass(ProfileEntity, profile);

const allProfile: Array<ProfileEntity> = plainToClass(ProfileEntity, [profile]);

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService, // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
        {
          provide: getRepositoryToken(ProfileEntity),
          useValue: null,
        },
      ],
    }).compile();

    // get the service from the testing module.
    service = module.get<ProfileService>(ProfileService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  describe('create profile', () => {
    it('should return created profile', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const createSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(oneProfile));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const profile = await service.create(profileDTO);

      // check the result against the expected results
      expect(profile).toEqual(oneProfile);

      // Ensure that the spies are called once with the appropriate arguments
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('edit profile', () => {
    it('should return updated profile', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const editSpy = jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(editProfile));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const profile = await service.edit('1', profileDTO);

      // check the result against the expected results
      expect(profile).toEqual(editProfile);

      // Ensure that the spies are called once with the appropriate arguments
      expect(editSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Now we are ready to write the tests.
  describe('find one', () => {
    it('should return a profile', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(oneProfile));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const profile = await service.findOne(oneProfile.id);

      // check the result against the expected results
      expect(profile).toEqual(oneProfile);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(oneProfile.id);
    });
  });

  // Now we are ready to write the tests.
  describe('delete profile', () => {
    it('should return a delete profile', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(oneProfile));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const profile = await service.delete(oneProfile.id);

      // check the result against the expected results
      expect(profile).toEqual(oneProfile);

      // Ensure that the spies are called once with the appropriate arguments
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(oneProfile.id);
    });
  });

  describe('find all', () => {
    it('should return list skills', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(allProfile));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const profiles = await service.findAll();

      // check the result against the expected results
      expect(profiles).toEqual(allProfile);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
