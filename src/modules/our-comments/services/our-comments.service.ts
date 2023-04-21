import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OurCommentEntity } from '../our-comment.entity';
import { Repository } from 'typeorm';
import { CreateOurCommentDto } from '../dto/create-our-comment.dto';
import { UpdateOurCommentDto } from '../dto/update-our-comment.dto';

@Injectable()
export class OurCommentsService {

  constructor(
    @InjectRepository(OurCommentEntity)
    private readonly ourCommentsRepository: Repository<OurCommentEntity>
  ){}

  async findAll(){
    return await this.ourCommentsRepository.find();
  }

  async findById(id: number){
    return await this.ourCommentsRepository.findOneBy({id});
  }

  async createOne(body: CreateOurCommentDto, image: Express.Multer.File){

    if(!body) throw new HttpException('No body', HttpStatus.FORBIDDEN);

    const { imgAlt } = body;
    const img_src = image ? image.path : null;

    const newOurComment = this.ourCommentsRepository.create({
      img_src,
      img_alt: imgAlt
    })

    return await this.ourCommentsRepository.save(newOurComment);
  }

  async updateById(id: number, body: UpdateOurCommentDto, image: Express.Multer.File){

    if(!body) throw new HttpException('No body', HttpStatus.FORBIDDEN);

    const curItem = await this.findById(id);

    if(curItem == null)
    throw new HttpException(`Such item doesn't exists`, HttpStatus.FORBIDDEN);

    const { imgAlt } = body;
    const img_src = image ? image.path : null;


    return await this.ourCommentsRepository.update({id}, {
      img_src,
      img_alt: imgAlt
    }).then(() => this.findById(id))
  }

  async deleteById(id: number){
    return await this.ourCommentsRepository.delete(id)
    .then(() => `successfully delete by id: ${id}`)

  }
}
