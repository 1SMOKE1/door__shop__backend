import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorSizeEntity } from '../door-size.entity';
import { Repository } from 'typeorm';
import { CreateDoorSizeDto } from '../dto/create-door-size.dto';
import { UpdateDoorSizeDto } from '../dto/update-door-size.dto';

@Injectable()
export class DoorSizeService {

  constructor(
    @InjectRepository(DoorSizeEntity)
    private readonly doorSizeEntityRepository: Repository<DoorSizeEntity>
  ){}

  async findAll() {
    return await this.doorSizeEntityRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorSizeEntityRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorSizeDto) {
    const newEntity = this.doorSizeEntityRepository.create(body);

    return await this.doorSizeEntityRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorSizeDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSizeEntityRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSizeEntityRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
