import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurposeEntity } from '../purpose.entity';
import { Repository } from 'typeorm';
import { CreatePurposeDto } from '../dto/create-purpose.dto';
import { UpdatePurposeDto } from '../dto/update-purpose.dto';

@Injectable()
export class PurposeService {

  constructor(
    @InjectRepository(PurposeEntity)
    private readonly purposeRepository: Repository<PurposeEntity>
  ){}

  async findAll(){
    return await this.purposeRepository.find();
  }

  async findById(id: number){
    const curItem = await this.purposeRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreatePurposeDto){

    const { isUsing } = body;

    const newEntity = this.purposeRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.purposeRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdatePurposeDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.purposeRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.purposeRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
