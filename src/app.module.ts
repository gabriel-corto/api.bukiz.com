import { Module } from '@nestjs/common';
import { HTTPModule } from './infra/http/http.module';

@Module({
  imports: [HTTPModule],
})
export class AppModule {}
