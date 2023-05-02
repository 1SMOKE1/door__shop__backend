import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorWeightEntity } from '../door-weight.entity';
import { Repository } from 'typeorm';
import { CreateDoorWeightDto } from '../dto/create-door-weight.dto';
import { UpdateDoorWeightDto } from '../dto/update-door-weight.dto';

@Injectable()
export class DoorWeightService {

  constructor(
    @InjectRepository(DoorWeightEntity)
    private readonly doorWeightRepository: Repository<DoorWeightEntity>
  ){}

  async findAll() {
    return await this.doorWeightRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorWeightRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorWeightDto) {
    const newEntity = this.doorWeightRepository.create(body);

    return await this.doorWeightRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorWeightDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorWeightRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorWeightRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
