import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MosquitNetEntity } from '../mosquit-net.entity';
import { Repository } from 'typeorm';
import { CreateMosquitNetDto } from '../dto/create-mosquit-net.dto';
import { UpdateMosquitNetDto } from '../dto/update-mosquit-net.dto';

@Injectable()
export class MosquitNetService {

  constructor(
    @InjectRepository(MosquitNetEntity)
    private readonly mosquitNetRepository: Repository<MosquitNetEntity>
  ){}

  async findAll() {
    return await this.mosquitNetRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.mosquitNetRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateMosquitNetDto) {
    const newEntity = this.mosquitNetRepository.create(body);

    return await this.mosquitNetRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateMosquitNetDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.mosquitNetRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.mosquitNetRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
