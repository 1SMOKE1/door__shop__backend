import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DoorFrameMaterialEntity } from "../door-frame-material.entity";
import { Repository } from "typeorm";
import { CreateDoorFrameMaterialDto } from "../dto/create-door-frame-material.dto";
import { UpdateDoorFrameMaterialDto } from "../dto/update-door-frame-material.dto";


@Injectable()
export class DoorFrameMaterialService {
  constructor(
    @InjectRepository(DoorFrameMaterialEntity)
    private readonly doorFrameMaterialRepository: Repository<DoorFrameMaterialEntity>,
  ) {}

  async findAll() {
    return await this.doorFrameMaterialRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorFrameMaterialRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorFrameMaterialDto) {
    const newEntity = this.doorFrameMaterialRepository.create(body);

    return await this.doorFrameMaterialRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorFrameMaterialDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorFrameMaterialRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorFrameMaterialRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
