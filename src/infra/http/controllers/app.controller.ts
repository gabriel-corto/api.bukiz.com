import { Public } from '@/infra/shared/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Public()
  @Get()
  getWelcome() {
    return {
      statusCode: 200,
      version: '1.0.0',
      message: '🚀 Welcome to Bukiz API Service!',
    };
  }
}
