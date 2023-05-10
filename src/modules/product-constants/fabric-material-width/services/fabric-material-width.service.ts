import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FabricMaterialWidthEntity } from '../fabric-material-width.entity';
import { Repository } from 'typeorm';
import { CreateFabricMaterialWidthDto } from '../dto/create-fabric-material-width.dto';
import { UpdateFabricMaterialWidthDto } from '../dto/update-fabric-material-width.dto';

@Injectable()
export class FabricMaterialWidthService {

  constructor(
    @InjectRepository(FabricMaterialWidthEntity)
    private readonly fabricMaterialWidthRepository: Repository<FabricMaterialWidthEntity>
  ){}

  async findAll() {
    return await this.fabricMaterialWidthRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.fabricMaterialWidthRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateFabricMaterialWidthDto) {

    const newEntity = this.fabricMaterialWidthRepository.create(body);

    return await this.fabricMaterialWidthRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateFabricMaterialWidthDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.fabricMaterialWidthRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.fabricMaterialWidthRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
