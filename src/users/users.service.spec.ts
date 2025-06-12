import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

class UsersServiceTestSuite {
  service: UsersService;

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
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
