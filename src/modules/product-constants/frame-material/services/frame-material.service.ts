import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FrameMaterialEntity } from '../frame-material.entity';
import { Repository } from 'typeorm';
import { CreateFabricMaterialDto } from '../../fabric-material/dto/create-fabric-material.dto';
import { UpdateFabricMaterialDto } from '../../fabric-material/dto/update-fabric-material.dto';

@Injectable()
export class FrameMaterialService {

  constructor(
    @InjectRepository(FrameMaterialEntity)
    private readonly frameMaterialRepository: Repository<FrameMaterialEntity>
  ){}

  async findAll(){
    return await this.frameMaterialRepository.find();
  }

  async findById(id: number){
    const curItem = await this.frameMaterialRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFabricMaterialDto){

    const { isUsing } = body;

    const newEntity = this.frameMaterialRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.frameMaterialRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFabricMaterialDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.frameMaterialRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.frameMaterialRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
