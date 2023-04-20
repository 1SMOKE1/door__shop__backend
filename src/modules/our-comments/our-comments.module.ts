import { Module } from '@nestjs/common';
import { OurCommentsController } from './controllers/our-comments.controller';
import { OurCommentsService } from './services/our-comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurCommentEntity } from './our-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OurCommentEntity])
  ],
  controllers: [OurCommentsController],
  providers: [OurCommentsService],
  exports: [
    TypeOrmModule.forFeature([OurCommentEntity])
  ]
})
export class OurCommentsModule {}
