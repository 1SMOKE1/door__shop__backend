import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoorCoveringEntity } from "../door-covering.entity";
import { CreateDoorCoveringDto } from "../dto/create-door-covering.dto";
import { UpdateDoorCoveringDto } from "../dto/update-door-covering.dto";

@Injectable()
export class DoorCoveringService {
  constructor(
    @InjectRepository(DoorCoveringEntity)
    private readonly doorCoveringRepository: Repository<DoorCoveringEntity>,
  ) {}

  async findAll() {
    return await this.doorCoveringRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.doorCoveringRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateDoorCoveringDto) {
    const newEntity = this.doorCoveringRepository.create(body);

    return await this.doorCoveringRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateDoorCoveringDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorCoveringRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.doorCoveringRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
