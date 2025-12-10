import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      statusCode: 200,
      version: '1.0.0',
      message: '🚀 Welcome to Bukiz API Service!',
    };
  }
}
