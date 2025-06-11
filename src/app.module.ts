import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProtectedController } from './protected/protected.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-auth-db'),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProtectedController],
})
export class AppModule {}
