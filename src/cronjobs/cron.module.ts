import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { HeartbeatJob } from './jobs/heartbeat.job';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService, HeartbeatJob],
})
export class CronJobsModule {}
