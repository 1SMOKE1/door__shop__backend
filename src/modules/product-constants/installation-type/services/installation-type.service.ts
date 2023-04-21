import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallationTypeEntity } from '../installation-type.entity';
import { Repository } from 'typeorm';
import { CreateInstallationTypeDto } from '../dto/create-installation-type.dto';
import { UpdateInstallationTypeDto } from '../dto/update-installation-type.dto';

@Injectable()
export class InstallationTypeService {

  constructor(
    @InjectRepository(InstallationTypeEntity)
    private readonly installationTypeRepository: Repository<InstallationTypeEntity>
  ){}

  async findAll(){
    return await this.installationTypeRepository.find();
  }

  async findById(id: number){
    const curItem = await this.installationTypeRepository.findOneBy({id});

    if(curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateInstallationTypeDto){

    const { isUsing } = body;

    const newEntity = this.installationTypeRepository.create({
      ...body,
      is_using: isUsing
    })

    return await this.installationTypeRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateInstallationTypeDto){

    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { isUsing } = body;

    return await this.installationTypeRepository.update(id, {...body, is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.installationTypeRepository.delete({id})
    .then(() => `successfully delete by id: ${id}`)
  }
}
