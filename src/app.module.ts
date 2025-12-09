import { Module } from '@nestjs/common';
import { AuthModule } from '@/infra/http/auth/auth.module';
import { AppController } from './infra/http/app.controller';

@Module({
  controllers: [AppController],
  imports: [AuthModule],
})
export class AppModule {}
