import { HeartbeatJob } from './heartbeat.job';
import { Logger } from '@nestjs/common';

describe('HeartbeatJob', () => {
  let job: HeartbeatJob;

  beforeEach(() => {
    job = new HeartbeatJob();
  });

  it('should log heartbeat message', () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log');
    job.logHeartbeat();
    expect(logSpy).toHaveBeenCalledWith('CronJob running every minute');
  });
});
