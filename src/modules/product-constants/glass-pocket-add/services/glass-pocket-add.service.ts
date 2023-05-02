import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlassPocketAddEntity } from '../glass-pocket-add.entity';
import { Repository } from 'typeorm';
import { CreateGlassPocketAddDto } from '../dto/create-glass-pocket-add.dto';
import { UpdateGlassPocketAddDto } from '../dto/update-glass-pocket-add.dto';

@Injectable()
export class GlassPocketAddService {

  constructor(
    @InjectRepository(GlassPocketAddEntity)
    private readonly glassPocketAddRepository: Repository<GlassPocketAddEntity>
  ){}

  async findAll() {
    return await this.glassPocketAddRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.glassPocketAddRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateGlassPocketAddDto) {
    const newEntity = this.glassPocketAddRepository.create(body);

    return await this.glassPocketAddRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateGlassPocketAddDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.glassPocketAddRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.glassPocketAddRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
