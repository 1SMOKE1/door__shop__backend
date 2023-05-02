import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowSillEntity } from '../window-sill.entity';
import { Repository } from 'typeorm';
import { CreateWindowSillDto } from '../dto/create-window-sill.dto';
import { UpdateWindowSillDto } from '../dto/update-window-sill.dto';

@Injectable()
export class WindowSillService {

  constructor(
    @InjectRepository(WindowSillEntity)
    private readonly windowSillRepository: Repository<WindowSillEntity>
  ){}

  async findAll() {
    return await this.windowSillRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.windowSillRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowSillDto) {
    const newEntity = this.windowSillRepository.create(body);

    return await this.windowSillRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowSillDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowSillRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowSillRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
