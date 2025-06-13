import { Test } from '@nestjs/testing';
import { CronJobsModule } from './cron.module';

describe('CronJobsModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CronJobsModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });
});
