import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SectionCountEntity } from '../section-count.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionCountDto } from '../dto/create-section-count.dto';
import { UpdateSectionCountDto } from '../dto/update-section-count.dto';

@Injectable()
export class SectionCountService {

  constructor(
    @InjectRepository(SectionCountEntity)
    private readonly sectionCountRepository: Repository<SectionCountEntity>
  ){}

  async findAll() {
    return await this.sectionCountRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.sectionCountRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateSectionCountDto) {
    const newEntity = this.sectionCountRepository.create(body);

    return await this.sectionCountRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateSectionCountDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.sectionCountRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.sectionCountRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
