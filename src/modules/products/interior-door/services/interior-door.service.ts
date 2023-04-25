import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InteriorDoorEntity } from "../interior-door.entity";
import { Repository } from "typeorm";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { CreateInteriorDoorDto } from "../dto/create-interior-door.dto";
import checkEnum from "src/utils/checkEnum";
import { CountryEnum } from "src/enums/country.enum";
import generateErrorArr from "src/utils/generateErrorArr";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { StateEnum } from "src/enums/state.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { UpdateInteriorDoorDto } from "../dto/update-interior-door.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

@Injectable()
export class InteriorDoorService {
  constructor(
    @InjectRepository(InteriorDoorEntity)
    private readonly interiorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>
  ) {}

  async findAll() {
    return await this.interiorDoorRepository.find({ relations: { product_producer: true } });
  }

  async findById(id: number) {
    const currentProduct = await this.interiorDoorRepository.findOne({ where: { id }, relations: { product_producer: true } });

    if (currentProduct == null) throw new HttpException(`interiorDoor with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateInteriorDoorDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const {
      name,
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      typeOfProductName,
      finishingTheSurface,
      frameMaterial,
      structuralFeatures,
      openingType,
      installationType,
      openingMethod,
      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.interiorDoor)
    throw new HttpException(`typeOfProductName must be 'Двері міжкімнатні'`, HttpStatus.CONFLICT);

    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    const typeOfProductRelations = {relations: {type_of_product: true}, where: type_of_product};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer for interiorDoor`, HttpStatus.NOT_FOUND);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product });

    if (product_producer == null) {
      const producers = await this.productProducerRepository.find(typeOfProductRelations);

      throw new HttpException(`Incorrect productProducers: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = await generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(StateEnum, state))) {
      const states = await generateErrorArr(StateEnum);

      throw new HttpException(`Incorrect state, you could choose from: ${states.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    // finishingTheSurface: string[] // Оздоблення поверхні

    // frameMaterial: string[] // Матеріали дверної коробки

    // structuralFeatures: string[] // Конструктивні особливості

    // installationType: string[], // Тип монтажу

    // openingType: string[] // Тип відкривання

    // openingMethod: string[] // Спосіб відкривання
    

    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const newProduct = this.interiorDoorRepository.create({
      name,
      product_producer,
      type_of_product,
      country,
      guarantee,
      state,
      price: +price, 
      installation_price: +installationPrice,
      in_stock: inStock,
      finishing_the_surface: finishingTheSurface,
      frame_material: frameMaterial,
      structural_features: structuralFeatures,
      opening_type: openingType,
      installation_type: installationType,
      opening_method: openingMethod,
      description,
      home_page: homePage,
      images: imagesPathes,
    })
    return await this.interiorDoorRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateInteriorDoorDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const curProduct = await this.findById(id);

    if (curProduct == null) throw new HttpException(`interior_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      typeOfProductName,
      finishingTheSurface,
      frameMaterial,
      structuralFeatures,
      openingType,
      installationType,
      openingMethod,
      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.interiorDoor)
    throw new HttpException(`typeOfProductName must be 'Двері міжкімнатні'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: type_of_product};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer for interiorDoor`, HttpStatus.NOT_FOUND);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName, type_of_product });

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

    if (!(await checkEnum(StateEnum, state))) {
      const states = await generateErrorArr(StateEnum);

      throw new HttpException(`Incorrect state, you could choose from: ${states.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    // finishingTheSurface: string[] // Оздоблення поверхні

    // frameMaterial: string[] // Матеріали дверної коробки

    // structuralFeatures: string[] // Конструктивні особливості
  
    // openingType: string[] // Тип відкривання

    // installationType: string[], // Тип монтажу

    // openingMethod: string[] // Спосіб відкривання
   
    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    return await this.interiorDoorRepository
      .update(id, {
        name,
        country,
        guarantee,
        state,
        in_stock: inStock,
        price,
        installation_price: installationPrice,
        product_producer,
        type_of_product,
        finishing_the_surface: finishingTheSurface,
        frame_material: frameMaterial,
        structural_features: structuralFeatures,
        opening_type: openingType,
        installation_type: installationType,
        opening_method: openingMethod,
        home_page: homePage,
        description,
        images: imagesPathes
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null) throw new HttpException(`interior_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.interiorDoorRepository.delete(id)
    .then(() => `interior_door by id: ${id} was deleted successfuly`)
  }

  async deleteAll(){
    const interiorDoorIds = await this.interiorDoorRepository.find()
    .then((data: InteriorDoorEntity[]) => 
      data.map((item: InteriorDoorEntity): number => 
        (item.id)
      )
    );

    if(interiorDoorIds.length !== 0)
    await this.interiorDoorRepository.delete(interiorDoorIds);

    return `items were deleted successfuly`
  }
}
