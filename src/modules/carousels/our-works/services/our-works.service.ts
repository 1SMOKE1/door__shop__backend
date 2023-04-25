import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OurWorkEntity } from '../our-work.entity';
import { Repository } from 'typeorm';
import { CreateOurWorkDto } from '../dto/create-our-work.dto';
import { UpdateOurWorkDto } from '../dto/update-our-work.dto';



@Injectable()
export class OurWorksService {

  constructor(
    @InjectRepository(OurWorkEntity)
    private readonly ourWorksRepository: Repository<OurWorkEntity>
  ){}

  async findAll(){
    return await this.ourWorksRepository.find();
  }

  async findById(id: number){
    return await this.ourWorksRepository.findOneBy({id});
  }

  async createOne(body: CreateOurWorkDto, image: Express.Multer.File){

    if(!body) throw new HttpException('No body', HttpStatus.FORBIDDEN);

    const { imgAlt } = body;
    const img_src = image ? image.path : null;

    const newOurWork = this.ourWorksRepository.create({
      img_src,
      img_alt: imgAlt
    })

    return await this.ourWorksRepository.save(newOurWork);
  }

  async updateById(id: number, body: UpdateOurWorkDto, image: Express.Multer.File){

    if(!body) throw new HttpException('No body', HttpStatus.FORBIDDEN);

    const curItem = await this.findById(id);

    if(curItem == null)
    throw new HttpException(`Such item doesn't exists`, HttpStatus.FORBIDDEN);
    

    const { imgAlt } = body;
    const img_src = image ? image.path : null;

    return await this.ourWorksRepository.update({id}, {
      img_src,
      img_alt: imgAlt
    }).then(() => this.findById(id))
  }

  async deleteById(id: number){
    return await this.ourWorksRepository.delete(id)
    .then(() => `successfully delete by id: ${id}`)
  }





}
