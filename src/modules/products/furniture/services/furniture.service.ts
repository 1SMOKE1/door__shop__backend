import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FurnitureEntity } from "../furniture.entity";
import { Repository } from "typeorm";
import { CreateFurnitureDto } from "../dto/create-furniture.dto";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import checkEnum from "src/utils/checkEnum";
import generateErrorArr from "src/utils/generateErrorArr";
import { UpdateFurnitureDto } from "../dto/update-furniture.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class FurnitureService {

  getRelations = { relations: {
      product_producer: true,
      type_of_product: true,
    }
  }

  constructor(
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll() {
    return await this.furnitureRepository.find({...this.getRelations});
  }

  async findById(id: number) {
    const currentProduct = await this.furnitureRepository.findOne({ where: { id }, ...this.getRelations});

    if (currentProduct == null) throw new HttpException(`furniture with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async findByName(name: string) {
    return await this.furnitureRepository.findOne({ where: { name }, relations: { product_producer: true } });
  }

  async createOne(body: CreateFurnitureDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const {
      name,
      country, 
      guarantee,
      inStock,
      price,
      productProducerName,
      typeOfProductName,
      homePage,
      description,
      choosenImage,
    } = body;

    const exists = await this.findByName(name);

    if(exists !== null){
      throw new HttpException(`Item with current name: ${name} already exists`, HttpStatus.CONFLICT);
    }

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.furniture)
    throw new HttpException(`typeOfProductName must be 'Фурнітура'`, HttpStatus.CONFLICT);

    if (!(checkEnum(CountryEnum, country))) {
      const countries = generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.furniture}`, HttpStatus.NOT_FOUND);

    let product_producer: ProductProducerEntity;

    if(productProducerName === ''){
      product_producer = null;
    }
    else {
      product_producer= await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product});
      if (product_producer == null) {
        const producers = await this.productProducerRepository.find(typeOfProductRelations);
  
        throw new HttpException(`Некорректний виробник, ви взмозі обрати з: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
      }
    }

    if(isNaN(+price))
    throw new HttpException(`Incorrect price, price must be a number`, HttpStatus.CONFLICT);

    if(+price < 0)
      throw new HttpException(`Incorrect price, price must be bigger then 0`, HttpStatus.CONFLICT);

    if (!(checkEnum(CountryEnum, country))) {
      const countries = generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(InStockEnum, inStock))) {
      const inStocks = generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

     // IMAGES

     const { images } = files;

     let imagesPathes: string[] = [];
     
     if(images)
     imagesPathes = images.map((el) => el ? el.path : null);

     const changedDescription = description.replace(/\s\s+/g, '<br><br><br>');

     await this.cacheManager.reset();

    const newProduct = this.furnitureRepository.create({
      name,
      country,
      guarantee,
      in_stock: inStock,
      price,
      product_producer,
      type_of_product,
      home_page: homePage,
      description: changedDescription,
      images: imagesPathes,
      choosen_image: choosenImage
    });
    return await this.furnitureRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateFurnitureDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const curProduct = await this.findById(id);

    if (curProduct == null) throw new HttpException(`furniture with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      country,
      guarantee,
      inStock,
      price,
      productProducerName,
      homePage,
      description,
      typeOfProductName,
      choosenImage,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.furniture)
    throw new HttpException(`typeOfProductName must be 'Фурнітура'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}}

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.furniture}`, HttpStatus.NOT_FOUND);

    let product_producer: ProductProducerEntity;

    if(productProducerName === ''){
      product_producer = null;
    }
    else {
      product_producer= await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product});
      if (product_producer == null) {
        const producers = await this.productProducerRepository.find(typeOfProductRelations);
  
        throw new HttpException(`Некорректний виробник, ви взмозі обрати з: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
      }
    }

    if (!(checkEnum(CountryEnum, country))) {
      const countries = generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(InStockEnum, inStock))) {
      const inStocks = generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }


    if(isNaN(+price))
     throw new HttpException(`Incorrect price, price must be a number`, HttpStatus.CONFLICT);

    if(+price < 0)
      throw new HttpException(`Incorrect price, price must be bigger then 0`, HttpStatus.CONFLICT);
    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [...curProduct.images];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const changedDescription = description.replace(/\s\s+/g, '<br><br><br>');

    await this.cacheManager.reset();

    return await this.furnitureRepository
      .update(id, {
        name,
        country,
        guarantee,
        product_producer,
        type_of_product,
        in_stock: inStock,
        price,
        home_page: homePage,
        description: changedDescription,
        images: imagesPathes,
        choosen_image: choosenImage
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`furniture with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    await this.cacheManager.reset();

    return await this.furnitureRepository.delete(id)
    .then(() => `furniture by id: ${id} was deleted successfuly`);
  }

  async deleteAll(){
    const funitureIds = await this.furnitureRepository.find()
    .then((data: FurnitureEntity[]) => 
      data.map((item: FurnitureEntity): number => 
        (item.id)
      )
    );

    await this.cacheManager.reset();
    
    if(funitureIds.length !== 0)
    await this.furnitureRepository.delete(funitureIds);

    return `items were deleted successfuly`
  }
}
