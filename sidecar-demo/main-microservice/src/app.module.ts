import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HelloController } from './hello.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}