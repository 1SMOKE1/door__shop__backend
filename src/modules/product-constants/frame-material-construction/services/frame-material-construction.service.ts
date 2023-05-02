import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FrameMaterialConstructionEntity } from '../frame-material-construction.entity';
import { Repository } from 'typeorm';
import { CreateFrameMaterialConstructionDto } from '../dto/create-frame-material-construction.dto';
import { UpdateFrameMaterialConstructionDto } from '../dto/update-frame-material-construction.dto';

@Injectable()
export class FrameMaterialConstructionService {

  constructor(
    @InjectRepository(FrameMaterialConstructionEntity)
    private readonly frameMaterialConstructionRepository: Repository<FrameMaterialConstructionEntity>
  ){}

  async findAll() {
    return await this.frameMaterialConstructionRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.frameMaterialConstructionRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFrameMaterialConstructionDto) {
    const newEntity = this.frameMaterialConstructionRepository.create(body);

    return await this.frameMaterialConstructionRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFrameMaterialConstructionDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.frameMaterialConstructionRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.frameMaterialConstructionRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
