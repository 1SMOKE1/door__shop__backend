import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoveringEntity } from '../covering.entity';
import { Repository } from 'typeorm';
import { CreateCoveringDto } from '../dto/create-covering.dto';
import { UpdateCoveringDto } from '../dto/update-covering.dto';

@Injectable()
export class CoveringService {

  constructor(
    @InjectRepository(CoveringEntity)
    private readonly coveringRepository: Repository<CoveringEntity>
  ){}

  async findAll(){
    return await this.coveringRepository.find();
  }

  async findById(id: number){
    const curItem = await this.coveringRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateCoveringDto){

    const { isUsing } = body;

    const newEntity = this.coveringRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.coveringRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateCoveringDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.coveringRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.coveringRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
