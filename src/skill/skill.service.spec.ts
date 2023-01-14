import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { SkillEntity } from './entities/skill.entity';
import { SkillService } from './skill.service';

const oneSkill: SkillEntity = plainToClass(SkillEntity, {
  id: 1,
  name: 'HTMl 5',
});

const editSkill: SkillEntity = plainToClass(SkillEntity, {
  id: 1,
  name: 'Java',
});

const allSkills: Array<SkillEntity> = plainToClass(SkillEntity, [
  {
    id: 1,
    name: 'HTMl 5',
  },
  {
    id: 2,
    name: 'CSS 3',
  },
]);

describe('SkillService', () => {
  let service: SkillService;

  const mockedRepo = {
    // mock the repo `findOneOrFail`
    findOneOrFail: jest.fn(() => Promise.resolve(oneSkill)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService, // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
        {
          provide: getRepositoryToken(SkillEntity),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    // get the service from the testing module.
    service = module.get<SkillService>(SkillService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  describe('createSkill', () => {
    it('should return created skill', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const createSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(oneSkill));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const skill = await service.create(oneSkill);

      // check the result against the expected results
      expect(skill).toEqual(oneSkill);

      // Ensure that the spies are called once with the appropriate arguments
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('editkill', () => {
    it('should return updated skill', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const editSpy = jest
        .spyOn(service, 'edit')
        .mockImplementation(() => Promise.resolve(editSkill));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const skill = await service.edit('1', editSkill);

      // check the result against the expected results
      expect(skill).toEqual(editSkill);

      // Ensure that the spies are called once with the appropriate arguments
      expect(editSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Now we are ready to write the tests.
  describe('findOne', () => {
    it('should return a skill', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(oneSkill));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const skill = await service.findOne(oneSkill.id);

      // check the result against the expected results
      expect(skill).toEqual({ ...oneSkill });

      // Ensure that the spies are called once with the appropriate arguments
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(oneSkill.id);
    });
  });

  describe('findAll', () => {
    it('should return list skills', async () => {
      // We can use jest spies to inspect if functions are called ...

      // create a spy for the repository findOne method
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(allSkills));

      // When we call a service function the following things happen:
      // - the real service function is called, so we can test its code
      // - the mocked repository method is called
      // note that if the service calls a function in a repo or query service that is not defined by a mock, the test
      // will fail
      const skills = await service.findAll();

      // check the result against the expected results
      expect(skills).toEqual(allSkills);

      // Ensure that the spies are called once with the appropriate arguments
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
