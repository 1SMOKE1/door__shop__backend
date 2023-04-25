import { Module } from '@nestjs/common';
import { OurWorksModule } from './our-works/our-works.module';
import { OurCommentsModule } from './our-comments/our-comments.module';

@Module({
  imports: [
    OurWorksModule,
    OurCommentsModule
  ]
})
export class CarouselsModule {}
