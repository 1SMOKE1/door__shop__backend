import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowLaminationEntity } from '../window-lamination.entity';
import { Repository } from 'typeorm';
import { UpdateWindowLaminationDto } from '../dto/update-window-lamination.dto';
import { CreateWindowLaminationDto } from '../dto/create-window-lamination.dto';

@Injectable()
export class WindowLaminationService {

  constructor(
    @InjectRepository(WindowLaminationEntity)
    private readonly windowLaminationRepository: Repository<WindowLaminationEntity>
  ){}

  async findAll(){
    return await this.windowLaminationRepository.find();
  }

  async findById(id: number){
    const curItem = await this.windowLaminationRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowLaminationDto){

    const newEntity = this.windowLaminationRepository.create(body,)

    return await this.windowLaminationRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowLaminationDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowLaminationRepository.update(id, body)
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowLaminationRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
