import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowEbbEntity } from '../window-ebb.entity';
import { Repository } from 'typeorm';
import { CreateWindowEbbDto } from '../dto/create-window-ebb.dto';
import { UpdateWindowEbbDto } from '../dto/update-window-ebb.dto';

@Injectable()
export class WindowEbbService {

  constructor(
    @InjectRepository(WindowEbbEntity)
    private readonly windowEbbRepository: Repository<WindowEbbEntity>
  ){}

  async findAll() {
    return await this.windowEbbRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.windowEbbRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateWindowEbbDto) {
    const newEntity = this.windowEbbRepository.create(body);

    return await this.windowEbbRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateWindowEbbDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowEbbRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.windowEbbRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
