import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeaturesEntity } from '../features.entity';
import { Repository } from 'typeorm';
import { CreateFeaturesDto } from '../dto/create-features.dto';
import { UpdateFeaturesDto } from '../dto/update-features.dto';

@Injectable()
export class FeaturesService {

  constructor(
    @InjectRepository(FeaturesEntity)
    private readonly featuresRepository: Repository<FeaturesEntity>
  ){}

  async findAll() {
    return await this.featuresRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.featuresRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFeaturesDto) {
    const newEntity = this.featuresRepository.create(body);

    return await this.featuresRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFeaturesDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.featuresRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.featuresRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
