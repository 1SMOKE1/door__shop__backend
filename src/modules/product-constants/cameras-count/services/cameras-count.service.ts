import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CamerasCountEntity } from '../cameras-count.entity';
import { Repository } from 'typeorm';
import { CreateCamerasCountDto } from '../dto/create-cameras-count.dto';
import { UpdateCamerasCountDto } from '../dto/update-cameras-count.dto';

@Injectable()
export class CamerasCountService {


  constructor(
    @InjectRepository(CamerasCountEntity)
    private readonly camerasCountRepository: Repository<CamerasCountEntity>
  ){}

  async findAll() {
    return await this.camerasCountRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.camerasCountRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateCamerasCountDto) {
    const newEntity = this.camerasCountRepository.create(body);

    return await this.camerasCountRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateCamerasCountDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.camerasCountRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.camerasCountRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
