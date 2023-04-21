import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowGlassEntity } from '../window-glasses.entity';
import { Repository } from 'typeorm';
import { CreateWindowGlassesDto } from '../dto/create-window-glasses.dto';
import { UpdateWindowGlassesDto } from '../dto/update-window-glasses.dto';


@Injectable()
export class WindowGlassesService {

  constructor(
    @InjectRepository(WindowGlassEntity)
    private readonly windowGlassesRepository: Repository<WindowGlassEntity>
  ){}

  async findAll(){
    return await this.windowGlassesRepository.find();
  }

  async findById(id: number){
    const curItem = await this.windowGlassesRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowGlassesDto){

    const { isUsing } = body;

    const newEntity = this.windowGlassesRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.windowGlassesRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowGlassesDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.windowGlassesRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowGlassesRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
