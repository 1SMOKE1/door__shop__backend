import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntranceDoorEntity } from "../entrance-door.entity";
import { Repository } from "typeorm";
import { CreateEntranceDoorDto } from "../dto/create-entrance-door.dto";
import checkEnum from "src/utils/checkEnum";
import { CountryEnum } from "src/enums/country.enum";
import generateErrorArr from "src/utils/generateErrorArr";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { StateEnum } from "src/enums/state.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { UpdateEntranceDoorDto } from "../dto/update-entrance-door.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { AmountOfSealingMaterialEntity } from "src/modules/product-constants/amount-of-sealing-materials/amount-of-sealing-material.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";


@Injectable()
export class EntranceDoorService {
  constructor(
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @InjectRepository(AmountOfSealingMaterialEntity)
    private readonly amountOfSealingMaterialsRepository: Repository<AmountOfSealingMaterialEntity>
  ) {}

  async findAll() {
    return await this.entranceDoorRepository.find({ relations: { 
      product_producer: true,
      type_of_product: true
    } });
  }

  async findById(id: number) {
    const currentProduct = await this.entranceDoorRepository.findOne({
      where: { id },
      relations: {
        product_producer: true,
        type_of_product: true
      }
    });

    if (currentProduct == null) throw new HttpException(`entrance_door with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateEntranceDoorDto, files: IImages) {
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
      amountOfSealingMaterials,
      fabricMaterial,
      openingMethod,
      covering,
      purpose,
      frameMaterial,
      homePage,
      description,
    } = body;

    const productProducers = await this.productProducerRepository.find();

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer`, HttpStatus.CONFLICT);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName });

    if (product_producer == null) {
      const producers = await this.productProducerRepository.find();

      throw new HttpException(`Incorrect productProducer you could choose from: ${producers
        .map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.entranceDoor)
    throw new HttpException(`typeOfProductName must be 'Двері вхідні'`, HttpStatus.CONFLICT);

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

    // amountOfSealingMaterials: string[] // Кількість ущільнюючих контурів

    // fabricMaterial: string[] // Матеріл дверного полотна

    // purpose: string[] // Призначення двері

    // openingMethod: string[] // Спосіб відкривання

    // covering: string[] // Покриття

    // frameMaterial: string[] // Матеріал дверної коробки

    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const newProduct = this.entranceDoorRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price: +price,
      installation_price: +installationPrice,
      product_producer,
      type_of_product,
      amount_of_sealing_materials: amountOfSealingMaterials,
      fabric_material: fabricMaterial,
      opening_method: openingMethod,
      covering: covering,
      purpose: purpose,
      frame_material: frameMaterial,
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
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      typeOfProductName,
      amountOfSealingMaterials,
      fabricMaterial,
      openingMethod,
      covering,
      purpose,
      frameMaterial,
      homePage,
      description,
    } = body;

    const productProducers = await this.productProducerRepository.find();

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer`, HttpStatus.CONFLICT);

    const product_producer = await this.productProducerRepository.findOneBy({ name: productProducerName });

    if (product_producer == null) {
      const producers = await this.productProducerRepository.find();

      throw new HttpException(`Incorrect productProducers: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrduct you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.entranceDoor)
    throw new HttpException(`typeOfProductName must be 'Двері вхідні'`, HttpStatus.CONFLICT);


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

    // amountOfSealingMaterials: string[] // Кількість ущільнюючих контурів

    // fabricMaterial: string[] // Матеріл дверного полотна

    // purpose: string[] // Призначення двері
  
    // openingMethod: string[] // Спосіб відкривання

    // covering: string[] // Покриття

    // frameMaterial: string[] // Матеріал дверної коробки
  
     // IMAGES

     const { images } = files;

     let imagesPathes: string[] = [];
     
     if(images)
     imagesPathes = images.map((el) => el ? el.path : null);
    
    return await this.entranceDoorRepository
      .update(id, {
        name,
        country,
        guarantee,
        state,
        in_stock: inStock,
        price: +price,
        installation_price: +installationPrice,
        type_of_product,
        product_producer,
        amount_of_sealing_materials: amountOfSealingMaterials,
        fabric_material: fabricMaterial,
        opening_method: openingMethod,
        covering,
        purpose,
        frame_material: frameMaterial,
        home_page: homePage,
        description,
        images: imagesPathes
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null) throw new HttpException(`entrance_door with current id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.entranceDoorRepository.delete(id);
  }
}
