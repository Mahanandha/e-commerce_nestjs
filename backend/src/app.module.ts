import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProtectedController } from './protected/protected.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MailerModule } from './mailer/mailer.module';
import { CronJobsModule } from './cronjobs/cron.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-auth-db'),
    AuthModule,
    UsersModule,
    ProductsModule,
    MailerModule,
    CronJobsModule,
  ],
  controllers: [ProtectedController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)

      .forRoutes(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.ALL },
      );
  }
}
