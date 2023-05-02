import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorSlidingSystemEntity } from '../door-sliding-system.entity';
import { Repository } from 'typeorm';
import { CreateDoorSlidingSystemDto } from '../dto/create-door-sliding-system.dto';
import { UpdateDoorSlidingSystemDto } from '../dto/update-door-sliding-system.dto';

@Injectable()
export class DoorSlidingSystemService {

  constructor(
    @InjectRepository(DoorSlidingSystemEntity)
    private readonly doorSlidingSystemRepository: Repository<DoorSlidingSystemEntity>
  ){}

  async findAll() {
    return await this.doorSlidingSystemRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorSlidingSystemRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorSlidingSystemDto) {
    const newEntity = this.doorSlidingSystemRepository.create(body);

    return await this.doorSlidingSystemRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorSlidingSystemDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSlidingSystemRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSlidingSystemRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }

}
