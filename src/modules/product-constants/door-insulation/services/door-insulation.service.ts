import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorInsulationEntity } from '../door-insulation.entity';
import { Repository } from 'typeorm';
import { UpdateDoorInsulationDto } from '../dto/update-door-insulation.dto';
import { CreateDoorInsulationDto } from '../dto/create-door-insulation.dto';

@Injectable()
export class DoorInsulationService {

  constructor(
    @InjectRepository(DoorInsulationEntity)
    private readonly doorInsulationRepository: Repository<DoorInsulationEntity>
  ){}

  async findAll() {
    return await this.doorInsulationRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorInsulationRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorInsulationDto) {
    const newEntity = this.doorInsulationRepository.create(body);

    return await this.doorInsulationRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorInsulationDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorInsulationRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorInsulationRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }

}
