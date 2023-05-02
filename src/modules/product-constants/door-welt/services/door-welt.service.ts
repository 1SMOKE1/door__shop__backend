import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorWeltEntity } from '../door-welt.entity';
import { Repository } from 'typeorm';
import { CreateDoorWeltDto } from '../dto/create-door-welt.dto';
import { UpdateDoorWeltDto } from '../dto/update-door-welt.dto';

@Injectable()
export class DoorWeltService {

  constructor(
    @InjectRepository(DoorWeltEntity)
    private readonly doorWeltRepository: Repository<DoorWeltEntity>
  ){}

  async findAll() {
    return await this.doorWeltRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorWeltRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorWeltDto) {
    const newEntity = this.doorWeltRepository.create(body);

    return await this.doorWeltRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorWeltDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorWeltRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorWeltRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
