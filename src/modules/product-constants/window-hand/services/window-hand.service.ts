import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WindowHandEntity } from '../window-hand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWindowHandDto } from '../dto/create-window-hand.dto';
import { UpdateWindowHandDto } from '../dto/update-window-hand.dto';

@Injectable()
export class WindowHandService {

  constructor(
    @InjectRepository(WindowHandEntity)
    private readonly windowHandRepository: Repository<WindowHandEntity>
  ){}

  async findAll() {
    return await this.windowHandRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.windowHandRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowHandDto) {
    const newEntity = this.windowHandRepository.create(body);

    return await this.windowHandRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowHandDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowHandRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowHandRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
