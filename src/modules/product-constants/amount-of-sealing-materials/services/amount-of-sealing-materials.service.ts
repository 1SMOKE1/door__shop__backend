import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AmountOfSealingMaterialEntity } from "../amount-of-sealing-material.entity";
import { Repository } from "typeorm";
import { CreateAmountOfSealingMaterialDto } from "../dto/create-amount-of-sealing-material.dto";
import { UpdateAmountOfSealingMaterialDto } from "../dto/update-amount-of-sealing-material.dto";

@Injectable()
export class AmountOfSealingMaterialsService {
  constructor(
    @InjectRepository(AmountOfSealingMaterialEntity)
    private readonly amountOfSealingMaterialsRepository: Repository<AmountOfSealingMaterialEntity>,
  ) {}

  async findAll() {
    return await this.amountOfSealingMaterialsRepository.find();
  }

  async findById(id: number) {
    return await this.amountOfSealingMaterialsRepository.findOneBy({ id });
  }

  async createOne(body: CreateAmountOfSealingMaterialDto) {

    const { name, price, isUsing } = body;

    const newEntity = this.amountOfSealingMaterialsRepository.create({
      name: `${name} (+${price} грн)`,
      price,
      is_using: isUsing
    });

    return await this.amountOfSealingMaterialsRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateAmountOfSealingMaterialDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    const { name, price, isUsing } = body;

    return await this.amountOfSealingMaterialsRepository.update(id, { 
      name: `${name ? name : curItem.name} (+${price ? price : curItem.price} грн)`,
      price,
      is_using: isUsing})
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.amountOfSealingMaterialsRepository.delete(id)
    .then(() => `successfully delete by id: ${id}`);
  }
}
