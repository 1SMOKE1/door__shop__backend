import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntranceDoorEntity } from "../entrance-door.entity";
import { Repository } from "typeorm";
import { CreateEntranceDoorDto } from "../dto/create-entrance-door.dto";
import checkEnum from "src/utils/checkEnum";
import { CountryEnum } from "src/enums/country.enum";
import generateErrorArr from "src/utils/generateErrorArr";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { UpdateEntranceDoorDto } from "../dto/update-entrance-door.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";



@Injectable()
export class EntranceDoorService {

  private getRelations = { relations: { 
      product_producer: true,
      type_of_product: true,
      door_hand: true,
      door_mechanism: true,
      door_loops: true,
      door_stopper: true,
    } 
  }

  constructor(
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
  ) {}

  async findAll() {
    return await this.entranceDoorRepository.find(this.getRelations);
  }

  async findById(id: number) {
    const currentProduct = await this.entranceDoorRepository.findOne(this.getRelations);

    if (currentProduct == null) throw new HttpException(`entrance_door with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateEntranceDoorDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const {
      name,
      productProducerName,
      typeOfProductName,
      country,
      guarantee,
      inStock,
      price,

      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.entranceDoor)
    throw new HttpException(`typeOfProductName must be 'Двері вхідні'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer for entranceDoor`, HttpStatus.NOT_FOUND);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product });

    if (product_producer == null) {
      const producers = await this.productProducerRepository.find(typeOfProductRelations);

      throw new HttpException(`Incorrect productProducer you could choose from: ${producers
        .map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = await generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }





    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const newProduct = this.entranceDoorRepository.create({
      name,
      country,
      guarantee,
      in_stock: inStock,
      price: +price,
      product_producer,
      type_of_product,

      home_page: homePage,
      description,
      images: imagesPathes
    });
    return await this.entranceDoorRepository.save(newProduct);
    
  }

  async updateById(id: number, body: UpdateEntranceDoorDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const curProduct = await this.findById(id);

    if (curProduct == null) throw new HttpException(`entrance_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      productProducerName,
      typeOfProductName,
      country,
      guarantee,
      inStock,
      price,



      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrduct you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.entranceDoor)
    throw new HttpException(`typeOfProductName must be 'Двері вхідні'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer for entranceDoor`, HttpStatus.NOT_FOUND);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product});

    if (product_producer == null) {
      const producers = await this.productProducerRepository.find(typeOfProductRelations);

      throw new HttpException(`Incorrect productProducers: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    
    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = await generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    // amountOfSealingMaterials: string[] // Кількість ущільнюючих контурів

    // fabricMaterial: string[] // Матеріл дверного полотна

    // purpose: string[] // Призначення двері
  
    // openingMethod: string[] // Спосіб відкривання

    // covering: string[] // Покриття

    // frameMaterial: string[] // Матеріал дверної коробки
  
     // IMAGES

     const { images } = files;

     let imagesPathes: string[] = [...curProduct.images];
     
     if(images)
     imagesPathes = images.map((el) => el ? el.path : null);
    
    return await this.entranceDoorRepository
      .update(id, {
        name,
        country,
        guarantee,
        in_stock: inStock,
        price: +price,
        type_of_product,
        product_producer,
        home_page: homePage,
        description,
        images: imagesPathes
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null) throw new HttpException(`entrance_door with current id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.entranceDoorRepository.delete(id)
    .then(() => `entrance_door by id: ${id} was deleted successfuly`)
  }

  async deleteAll(){
    const entrandeDoorIds = await this.entranceDoorRepository.find()
    .then((data: EntranceDoorEntity[]) => 
      data.map((item: EntranceDoorEntity): number => 
        (item.id)
      )
    );

    if(entrandeDoorIds.length !== 0)
    await this.entranceDoorRepository.delete(entrandeDoorIds);

    return `items were deleted successfuly`
  }
}
