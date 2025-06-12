import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

class UsersServiceTestSuite {
  service: UsersService;

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            // Add any other methods that UsersService uses
          },
        },
      ],
    }).compile();

    this.service = module.get<UsersService>(UsersService);
  }

  testIsDefined() {
    it('should be defined', () => {
      expect(this.service).toBeDefined();
    });
  }
}

describe('UsersService (OOP)', () => {
  const suite = new UsersServiceTestSuite();

  beforeEach(async () => {
    await suite.setup();
  });

  suite.testIsDefined();
});