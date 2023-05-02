import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorIsolationEntity } from '../door-isolation.entity';
import { Repository } from 'typeorm';
import { CreateDoorIsolationDto } from '../dto/create-door-isolation.dto';
import { UpdateDoorIsolationDto } from '../dto/update-door-isolation.dto';

@Injectable()
export class DoorIsolationService {

  constructor(
    @InjectRepository(DoorIsolationEntity)
    private readonly doorIsolationRepository: Repository<DoorIsolationEntity>
  ){}

  async findAll() {
    return await this.doorIsolationRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorIsolationRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorIsolationDto) {
    const newEntity = this.doorIsolationRepository.create(body);

    return await this.doorIsolationRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorIsolationDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorIsolationRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorIsolationRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
