import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoorSelectionBoardEntity } from '../door-selection-board.entity';
import { Repository } from 'typeorm';
import { CreateDoorSelectionBoardDto } from '../dto/create-door-selection-board.dto';
import { UpdateDoorSelectionBoardDto } from '../dto/update-door-selection-board.dto';

@Injectable()
export class DoorSelectionBoardService {


  constructor(
    @InjectRepository(DoorSelectionBoardEntity)
    private readonly doorSelectionBoardRepository: Repository<DoorSelectionBoardEntity>
  ){}

  async findAll() {
    return await this.doorSelectionBoardRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorSelectionBoardRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorSelectionBoardDto) {
    const newEntity = this.doorSelectionBoardRepository.create(body);

    return await this.doorSelectionBoardRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorSelectionBoardDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSelectionBoardRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorSelectionBoardRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
