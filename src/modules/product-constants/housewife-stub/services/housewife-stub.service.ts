import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HousewifeStubEntity } from '../housewife-stub.entity';
import { Repository } from 'typeorm';
import { CreateHousewifeStubDto } from '../dto/create-housewife-stub.dto';
import { UpdateHousewifeStubDto } from '../dto/update-housewife-stub.dto';

@Injectable()
export class HousewifeStubService {

  constructor(
    @InjectRepository(HousewifeStubEntity)
    private readonly housewifeStubRepository: Repository<HousewifeStubEntity>
  ){}

  async findAll() {
    return await this.housewifeStubRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.housewifeStubRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateHousewifeStubDto) {
    const newEntity = this.housewifeStubRepository.create(body);

    return await this.housewifeStubRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateHousewifeStubDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.housewifeStubRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.housewifeStubRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
