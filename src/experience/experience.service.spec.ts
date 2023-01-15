import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ExperienceEntity } from './entities/experience.entity';
import { ExperienceDTO } from './experience.dto';
import { ExperienceService } from './experience.service';

const exeprience: ExperienceEntity = plainToClass(ExperienceEntity, {
  id: 1,
  company: 'Soft Magic',
  position: 'Full Stack Developer',
  duities: [
    'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Vue, JavaScript',
    'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
    'Clients included Govement Of Sierra Leone, Orange SL, GIZ, Rainbo, and more',
  ],
  site: 'https://arsabi.com',
  start: '2022-02-23',
  end: '2022-12-23',
});

const expDTO: ExperienceDTO = plainToClass(ExperienceDTO, {
  id: 1,
  company: 'Soft Magic',
  position: 'Full Stack Developer',
  duities: [
    'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Vue, JavaScript',
    'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
    'Clients included Govement Of Sierra Leone, Orange SL, GIZ, Rainbo, and more',
  ],
  site: 'https://arsabi.com',
  start: '2022-02-23',
  end: '2022-12-23',
});

const oneExp: ExperienceEntity = plainToClass(ExperienceEntity, exeprience);

const editExp: ExperienceEntity = plainToClass(ExperienceEntity, exeprience);

const allExp: Array<ExperienceEntity> = plainToClass(ExperienceEntity, [
  exeprience,
]);

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceService, // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
        {
          provide: getRepositoryToken(ExperienceEntity),
          useValue: null,
        },
      ],
    }).compile();

    // get the service from the testing module.
    service = module.get<ExperienceService>(ExperienceService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  describe('create experience', () => {
    it('should return created experience', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const createSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(oneExp));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const experience = await service.create(expDTO);

      // check the result against the expected results
      expect(experience).toEqual(oneExp);

      // Ensure that the spies are called once with the appropriate arguments
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('edit experience', () => {
    it('should return updated experience', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const editSpy = jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(editExp));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const experience = await service.edit('1', expDTO);

      // check the result against the expected results
      expect(experience).toEqual(editExp);

      // Ensure that the spies are called once with the appropriate arguments
      expect(editSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Now we are ready to write the tests.
  describe('find one', () => {
    it('should return a experience', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(oneExp));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const experience = await service.findOne(oneExp.id);

      // check the result against the expected results
      expect(experience).toEqual(oneExp);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(oneExp.id);
    });
  });

  // Now we are ready to write the tests.
  describe('delete experience', () => {
    it('should return a delete experience', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(oneExp));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const experience = await service.delete(oneExp.id);

      // check the result against the expected results
      expect(experience).toEqual(oneExp);

      // Ensure that the spies are called once with the appropriate arguments
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(oneExp.id);
    });
  });

  describe('find all', () => {
    it('should return list experiences', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(allExp));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const experiences = await service.findAll();

      // check the result against the expected results
      expect(experiences).toEqual(allExp);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
