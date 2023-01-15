import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { WorkEntity } from './entities/work.entity';
import { WorkDTO } from './work.dto';
import { WorkService } from './work.service';

const work: WorkEntity = plainToClass(WorkEntity, {
  id: 1,
  company: 'Soft Magic',
  name: 'Full Stack Developer',
  featured: true,
  tech: [
    'C#',
    'Python',
    'Java Script',
    'Node Js',
    'React',
    'React Native',
    'Go Lang',
  ],
  github: 'https://arsabi.com',
  live: 'https://arsabi.com',
  date: '2022-02-23',
  details:
    'A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.',
});

const workDTO: WorkDTO = plainToClass(WorkDTO, {
  id: 1,
  company: 'Soft Magic',
  name: 'Full Stack Developer',
  featured: true,
  tech: [
    'C#',
    'Python',
    'Java Script',
    'Node Js',
    'React',
    'React Native',
    'Go Lang',
  ],
  github: 'https://arsabi.com',
  live: 'https://arsabi.com',
  date: '2022-02-23',
  details:
    'A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.',
});

const oneWork: WorkEntity = plainToClass(WorkEntity, work);

const editWork: WorkEntity = plainToClass(WorkEntity, work);

const allWork: Array<WorkEntity> = plainToClass(WorkEntity, [work]);

describe('WorkService', () => {
  let service: WorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkService, // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
        {
          provide: getRepositoryToken(WorkEntity),
          useValue: null,
        },
      ],
    }).compile();

    // get the service from the testing module.
    service = module.get<WorkService>(WorkService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  describe('create work', () => {
    it('should return created work', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const createSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(oneWork));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const work = await service.create(workDTO);

      // check the result against the expected results
      expect(work).toEqual(oneWork);

      // Ensure that the spies are called once with the appropriate arguments
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('edit work', () => {
    it('should return updated work', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const editSpy = jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(editWork));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const work = await service.edit('1', workDTO);

      // check the result against the expected results
      expect(work).toEqual(editWork);

      // Ensure that the spies are called once with the appropriate arguments
      expect(editSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Now we are ready to write the tests.
  describe('find one', () => {
    it('should return a work', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(oneWork));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const work = await service.findOne(oneWork.id);

      // check the result against the expected results
      expect(work).toEqual(oneWork);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(oneWork.id);
    });
  });

  // Now we are ready to write the tests.
  describe('delete work', () => {
    it('should return a delete work', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(oneWork));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const work = await service.delete(oneWork.id);

      // check the result against the expected results
      expect(work).toEqual(oneWork);

      // Ensure that the spies are called once with the appropriate arguments
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(oneWork.id);
    });
  });

  describe('find all', () => {
    it('should return list works', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(allWork));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const works = await service.findAll();

      // check the result against the expected results
      expect(works).toEqual(allWork);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
