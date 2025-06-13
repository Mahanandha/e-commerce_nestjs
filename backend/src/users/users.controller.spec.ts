import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

class UsersControllerTestSuite {
  controller: UsersController;

  constructor() {}

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    this.controller = module.get<UsersController>(UsersController);
  }

  testIsDefined() {
    it('should be defined', () => {
      expect(this.controller).toBeDefined();
    });
  }
}

describe('UsersController (OOP)', () => {
  const suite = new UsersControllerTestSuite();

  beforeEach(async () => {
    await suite.setup();
  });

  suite.testIsDefined();
});
