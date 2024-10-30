import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('hello')
export class HelloController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async sayHello(): Promise<string> {
    // Envía una solicitud al sidecar en localhost:3001/monitor
    await lastValueFrom(
      this.httpService.post('http://localhost:3001/monitor', {
        message: 'Hello from Main Microservice!',
      })
    );
    return 'Hello from Main Microservice!';
  }
}