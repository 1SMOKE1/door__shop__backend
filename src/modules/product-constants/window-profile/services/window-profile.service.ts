import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowProfileEntity } from '../window-profile.entity';
import { Repository } from 'typeorm';
import { CreateWindowProfileDto } from '../dto/create-window-profile.dto';
import { UpdateWindowProfileDto } from '../dto/update-window-profile.dto';

@Injectable()
export class WindowProfileService {

  constructor(
    @InjectRepository(WindowProfileEntity)
    private readonly windowProfileRepository: Repository<WindowProfileEntity>
  ){}

  async findAll(){
    return await this.windowProfileRepository.find();
  }

  async findById(id: number){
    const curItem = await this.windowProfileRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowProfileDto){

    const newEntity = this.windowProfileRepository.create(body)

    return await this.windowProfileRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowProfileDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowProfileRepository.update(id, body)
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowProfileRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }

}
