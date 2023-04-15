import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOfProductEntity } from "../type-of-product.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeOfProductsService {
  constructor(
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
  ) {}

  async findAll() {
    return await this.typeOfProductRepository.find();
  }

  async findById(id: number) {
    return await this.typeOfProductRepository.findOneBy({id});
  }
}
