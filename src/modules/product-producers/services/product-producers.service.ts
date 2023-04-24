import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductProducerEntity } from "../product-producer.entity";
import { Repository } from "typeorm";
import { CreateProductProducerDto } from "../dto/create-product-producer.dto";
import { UpdateProductProducerDto } from "../dto/update-product-producer.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";

@Injectable()
export class ProductProducersService {
  constructor(
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>
  ) {}

  async findAll() {
    return await this.productProducerRepository.find({relations: {type_of_product: true}});
  }

  async findById(id: number) {

    const curItem = await this.productProducerRepository.findOne({where: {id}, relations: {type_of_product: true}})

    if(curItem == null) throw new HttpException(`Such element by id: ${id} doesn't exists`, HttpStatus.NOT_FOUND); 

    return curItem;
  }

  async createOne(body: CreateProductProducerDto) {
    if (!body) 
    throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const { typeOfProductName, name } = body;
    
    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrduct you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }


    const newProductProducer = this.productProducerRepository.create({name, type_of_product});

    return await this.productProducerRepository.save(newProductProducer);
  }

  async updateOne(id: number, body: UpdateProductProducerDto) {
    if (!body) {
      throw new HttpException("No body", HttpStatus.BAD_REQUEST);
    }

    const { typeOfProductName, name } = body;
    
    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrduct you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    return await this.productProducerRepository
      .update({ id }, {name, type_of_product})
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
