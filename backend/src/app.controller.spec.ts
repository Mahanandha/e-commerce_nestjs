import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class AppControllerTestSuite {
  controller: AppController;

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    this.controller = module.get<AppController>(AppController);
  }

  testRoot() {
    describe('root', () => {
      it('should return "Hello World!"', () => {
        expect(this.controller.getHello()).toBe('Hello World!');
      });
    });
  }
}

describe('AppController (OOP)', () => {
  const suite = new AppControllerTestSuite();

  beforeEach(async () => {
    await suite.setup();
  });

  suite.testRoot();
});
