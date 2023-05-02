import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChildLockEntity } from '../child-lock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChildLockDto } from '../dto/create-child-lock.dto';
import { UpdateChildLockDto } from '../dto/update-child-lock.dto';

@Injectable()
export class ChildLockService {

  constructor(
    @InjectRepository(ChildLockEntity)
    private readonly childLockRepository: Repository<ChildLockEntity>
  ){}

  async findAll() {
    return await this.childLockRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.childLockRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateChildLockDto) {
    const newEntity = this.childLockRepository.create(body);

    return await this.childLockRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateChildLockDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.childLockRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.childLockRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
