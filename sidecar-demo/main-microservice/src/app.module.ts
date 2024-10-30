import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HelloController } from './hello.controller';

@Module({
  imports: [HttpModule],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}