import { Module } from '@nestjs/common';
import { OpeningMethodController } from './controllers/opening-method.controller';
import { OpeningMethodService } from './services/opening-method.service';

@Module({
  controllers: [OpeningMethodController],
  providers: [OpeningMethodService]
})
export class OpeningMethodModule {}
