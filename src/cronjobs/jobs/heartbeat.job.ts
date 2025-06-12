import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HeartbeatJob {
  private readonly logger = new Logger(HeartbeatJob.name);

  @Cron(CronExpression.EVERY_MINUTE)
  logHeartbeat() {
    this.logger.log('CronJob running every minute');
  }
}
