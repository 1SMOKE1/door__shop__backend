import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpeningMethodEntity } from '../opening-method.entity';
import { Repository } from 'typeorm';
import { CreateOpeningMethodDto } from '../dto/create-opening-method.dto';
import { UpdateOpeningMethodDto } from '../dto/update-opening-method.dto';

@Injectable()
export class OpeningMethodService {

  constructor(
    @InjectRepository(OpeningMethodEntity)
    private readonly openingMethodRepository: Repository<OpeningMethodEntity>
  ){}

  async findAll(){
    return await this.openingMethodRepository.find();
  }

  async findById(id: number){
    const curItem = await this.openingMethodRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateOpeningMethodDto){

    const { isUsing } = body;

    const newEntity = this.openingMethodRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.openingMethodRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateOpeningMethodDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.openingMethodRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.openingMethodRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
