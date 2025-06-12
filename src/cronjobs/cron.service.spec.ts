import { Test, TestingModule } from '@nestjs/testing';
import { CronService } from './cron.service';
import { Logger } from '@nestjs/common';

describe('CronService', () => {
  let service: CronService;
  let loggerLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronService],
    }).compile();

    service = module.get<CronService>(CronService);
    loggerLogSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log a message when handleHeartbeat is called', () => {
    service.handleHeartbeat();

    expect(loggerLogSpy).toHaveBeenCalledWith('schedule every 10s');
  });
});
