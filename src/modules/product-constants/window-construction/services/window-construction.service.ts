import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowConstructionEntity } from '../window-construction.entity';
import { Repository } from 'typeorm';
import { CreateWindowConstructionDto } from '../dto/create-window-construction.dto';
import { UpdateWindowConstructionDto } from '../dto/update-window-construction.dto';

@Injectable()
export class WindowConstructionService {

  constructor(
    @InjectRepository(WindowConstructionEntity)
    private readonly windowConstructionRepository: Repository<WindowConstructionEntity>
  ){}

  async findAll(){
    return await this.windowConstructionRepository.find();
  }

  async findById(id: number){
    const curItem = await this.windowConstructionRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowConstructionDto){

    const { isUsing } = body;

    const newEntity = this.windowConstructionRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.windowConstructionRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowConstructionDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.windowConstructionRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowConstructionRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
