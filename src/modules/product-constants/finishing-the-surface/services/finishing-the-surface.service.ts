import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinishingTheSurfaceEntity } from '../finishing-the-surface.entity';
import { Repository } from 'typeorm';
import { CreateFabricMaterialDto } from '../../fabric-material/dto/create-fabric-material.dto';
import { UpdateFabricMaterialDto } from '../../fabric-material/dto/update-fabric-material.dto';

@Injectable()
export class FinishingTheSurfaceService {

  constructor(
    @InjectRepository(FinishingTheSurfaceEntity)
    private readonly finishingTheSurfaceRepository: Repository<FinishingTheSurfaceEntity>
  ){}

  async findAll(){
    return await this.finishingTheSurfaceRepository.find();
  }

  async findById(id: number){
    const curItem = await this.finishingTheSurfaceRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFabricMaterialDto){

    const { isUsing } = body;

    const newEntity = this.finishingTheSurfaceRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.finishingTheSurfaceRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFabricMaterialDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.finishingTheSurfaceRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.finishingTheSurfaceRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }

}
