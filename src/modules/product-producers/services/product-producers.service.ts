import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductProducerEntity } from "../product-producer.entity";
import { Repository } from "typeorm";
import { CreateProductProducerDto } from "../dto/create-product-producer.dto";
import { UpdateProductProducerDto } from "../dto/update-product-producer.dto";

@Injectable()
export class ProductProducersService {
  constructor(
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>
  ) {}

  async findAll() {
    return await this.productProducerRepository.find();
  }

  async findById(id: number) {
    return await this.productProducerRepository.findOneBy({id});
  }

  async createOne(body: CreateProductProducerDto) {
    if (!body) {
      throw new HttpException("No body", HttpStatus.BAD_REQUEST);
    }

    const newProductProducer = this.productProducerRepository.create(body);

    return await this.productProducerRepository.save(newProductProducer);
  }

  async updateOne(id: number, body: UpdateProductProducerDto) {
    if (!body) {
      throw new HttpException("No body", HttpStatus.BAD_REQUEST);
    }

    return await this.productProducerRepository
      .update({ id }, body)
      .then(() => this.findById(id));
  }

  async deleteOne(id: number) {
    const deletedItem = await this.findById(id);

    if (deletedItem === null) {
      throw new HttpException(
        `Sorry this item doesn't even exists`,
        HttpStatus.CONFLICT,
      );
    }

    return await this.productProducerRepository
      .delete(id)
      .then(() => `successfully delete by id: ${id}`);
  }
}
