import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WindowEntity } from "../window.entity";
import { Repository } from "typeorm";
import { CreateWindowDto } from "../dto/create-window.dto";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import checkEnum from "src/utils/checkEnum";
import generateErrorArr from "src/utils/generateErrorArr";
import { UpdateWindowDto } from "../dto/update-window.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

@Injectable()
export class WindowService {
  constructor(
    @InjectRepository(WindowEntity)
    private readonly windowRepository: Repository<WindowEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>
  ) {}

  async findAll() {
    return await this.windowRepository.find({ relations: { product_producer: true } });
  }

  async findById(id: number) {
    const currentProduct = await this.windowRepository.findOne({ where: { id }, relations: { product_producer: true } });

    if (currentProduct == null) throw new HttpException(`window with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateWindowDto, files: IImages) {
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
      profile,
      construction,
      glassUnit,
      lamination,
      glasses,
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

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.windows)
    throw new HttpException(`typeOfProductName must be 'Вікна'`, HttpStatus.CONFLICT);

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


    // profile: string[] // Профіль

    //construction:  string[] // Конструкція

    // glassUnit: string[] // Стеклопакети

    // lamination: string [] // Ламінація

    // glasses: string[] // Стекла

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const newProduct = this.windowRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer,
      type_of_product,
      profile: profile,
      construction: construction,
      glass_unit: glassUnit,
      lamination: lamination,
      glasses: glasses,
      home_page: homePage,
      description,
      images: imagesPathes
    });
    return await this.windowRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateWindowDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const curProduct = await this.findById(id);

    if (curProduct == null)
    throw new HttpException(`window with current id: ${id} doesn't exists`,
    HttpStatus.NOT_FOUND);

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
      profile,
      construction,
      glassUnit,
      lamination,
      glasses,
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

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.windows)
    throw new HttpException(`typeOfProductName must be 'Вікна'`, HttpStatus.CONFLICT);

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


    // profile: string[] // Профіль
  
    //construction:  string[] // Конструкція

    // glassUnit: string[] // Стеклопакети

    // lamination: string [] // Ламінація
  
    // glasses: string[] // Стекла

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    return await this.windowRepository
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
        profile: profile ,
        construction: construction,
        glass_unit: glassUnit,
        lamination: lamination,
        glasses: glasses,
        home_page: homePage,
        description,
        images: imagesPathes
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null)
    throw new HttpException(`window with current id: ${id} doesn't exists`,
    HttpStatus.NOT_FOUND);

    return await this.windowRepository.delete(id);
  }
}
