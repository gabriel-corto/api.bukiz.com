import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: '🚀 Welcome to Bukiz API Service!',
      version: '1.0.0',
    };
  }
}
