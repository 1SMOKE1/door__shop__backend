import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FabricMaterialEntity } from '../fabric-material.entity';
import { Repository } from 'typeorm';
import { CreateFabricMaterialDto } from '../dto/create-fabric-material.dto';
import { UpdateFabricMaterialDto } from '../dto/update-fabric-material.dto';

@Injectable()
export class FabricMaterialService {

  constructor(
    @InjectRepository(FabricMaterialEntity)
    private readonly fabricMaterialRepository: Repository<FabricMaterialEntity>
  ){}

  async findAll(){
    return await this.fabricMaterialRepository.find();
  }

  async findById(id: number){
    const curItem = await this.fabricMaterialRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFabricMaterialDto){

    const { isUsing } = body;

    const newEntity = this.fabricMaterialRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.fabricMaterialRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFabricMaterialDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.fabricMaterialRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.fabricMaterialRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
