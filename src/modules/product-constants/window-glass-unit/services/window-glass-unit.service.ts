import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowGlassUnitEntity } from '../window-glass-unit.entity';
import { Repository } from 'typeorm';
import { CreateWindowGlassUnitDto } from '../dto/create-window-glass-unit.dto';
import { UpdateWindowGlassUnitDto } from '../dto/update-window-glass-unit.dto';

@Injectable()
export class WindowGlassUnitService {

  constructor(
    @InjectRepository(WindowGlassUnitEntity)
    private readonly windowGlassUnitRepository: Repository<WindowGlassUnitEntity>
  ){}

  async findAll(){
    return await this.windowGlassUnitRepository.find();
  }

  async findById(id: number){
    const curItem = await this.windowGlassUnitRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowGlassUnitDto){

    const { isUsing } = body;

    const newEntity = this.windowGlassUnitRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.windowGlassUnitRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowGlassUnitDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.windowGlassUnitRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowGlassUnitRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
