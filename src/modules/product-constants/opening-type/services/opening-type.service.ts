import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpeningTypeEntity } from '../opening-type.entity';
import { Repository } from 'typeorm';
import { UpdateOpeningTypeDto } from '../dto/update-opening-type.dto';
import { CreateOpeningTypeDto } from '../dto/create-opening-type.dto';

@Injectable()
export class OpeningTypeService {

  constructor(
    @InjectRepository(OpeningTypeEntity)
    private readonly openingTypeRepository: Repository<OpeningTypeEntity>
  ){}

  async findAll(){
    return await this.openingTypeRepository.find();
  }

  async findById(id: number){
    const curItem = await this.openingTypeRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateOpeningTypeDto){

    const { isUsing } = body;

    const newEntity = this.openingTypeRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.openingTypeRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateOpeningTypeDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.openingTypeRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.openingTypeRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}