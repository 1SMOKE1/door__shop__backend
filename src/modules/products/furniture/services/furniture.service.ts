import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FurnitureEntity } from "../furniture.entity";
import { Repository } from "typeorm";
import { CreateFurnitureDto } from "../dto/create-furniture.dto";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import checkEnum from "src/utils/checkEnum";
import generateErrorArr from "src/utils/generateErrorArr";
import { UpdateFurnitureDto } from "../dto/update-furniture.dto";

@Injectable()
export class FurnitureService {
  constructor(
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
  ) {}

  async findAll() {
    return await this.furnitureRepository.find({ relations: { product_producer: true } });
  }

  async findById(id: number) {
    const currentProduct = await this.furnitureRepository.findOne({where: {id}, relations: {product_producer: true}});

    if (currentProduct == null) throw new HttpException(`furniture with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateFurnitureDto) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const { name, country, guarantee, state, inStock, price, installationPrice, productProducerName, homePage, description } = body;

    if (!name) throw new HttpException("No name", HttpStatus.FORBIDDEN);

    if (name.trim() == "") throw new HttpException(`Name can't be empty`, HttpStatus.CONFLICT);

    if (!productProducerName) throw new HttpException("No productProducerName", HttpStatus.FORBIDDEN);

    const productProducer = await this.productProducerRepository.findOneBy({ name: productProducerName });

    if (productProducer == null) {
      const producers = await this.productProducerRepository.find();

      throw new HttpException(`Incorrect productProducers: ${producers.map((el: ProductProducerEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT);
    }

    if(!country) throw new HttpException('No country', HttpStatus.FORBIDDEN);

    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if(!guarantee) throw new HttpException('No guarantee', HttpStatus.FORBIDDEN);

    if (!(await checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = await generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if(!state) throw new HttpException('No state', HttpStatus.FORBIDDEN);

    if (!(await checkEnum(StateEnum, state))) {
      const states = await generateErrorArr(StateEnum);

      throw new HttpException(`Incorrect state, you could choose from: ${states.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!inStock) {
      throw new HttpException("No inStock", HttpStatus.FORBIDDEN);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!price) throw new HttpException("No price", HttpStatus.FORBIDDEN);

    if(typeof price != 'number') throw new HttpException("price must be typeof number", HttpStatus.CONFLICT);

    if (price < 0) throw new HttpException("Incorrect price", HttpStatus.CONFLICT);

    if (!installationPrice) throw new HttpException("No installationPrice", HttpStatus.FORBIDDEN);

    if(typeof installationPrice != 'number') throw new HttpException("installationPrice must be typeof number", HttpStatus.CONFLICT);

    if (installationPrice < 0) throw new HttpException("Incorrect installationPrice", HttpStatus.CONFLICT);

    const newProduct = this.furnitureRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      home_page: homePage,
      description,
    });
    return await this.furnitureRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateFurnitureDto) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    if ((await this.findById(id)) == null) throw new HttpException(`furniture with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const { name, country, guarantee, state, inStock, price, installationPrice, productProducerName, homePage, description } = body;

    if (!name) throw new HttpException("No name", HttpStatus.FORBIDDEN);

    if (name.trim() == "") throw new HttpException(`Name can't be empty`, HttpStatus.CONFLICT);

    if (!productProducerName) throw new HttpException("No productProducerName", HttpStatus.FORBIDDEN);
    const productProducer = await this.productProducerRepository.findOneBy({ name: productProducerName });

    if (productProducer == null) {
      const producers = await this.productProducerRepository.find();

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

    if (!inStock) {
      throw new HttpException("No inStock", HttpStatus.FORBIDDEN);
    }

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!price) throw new HttpException("No price", HttpStatus.FORBIDDEN);

    if(typeof price != 'number') throw new HttpException("price must be typeof number", HttpStatus.CONFLICT);

    if (price < 0) throw new HttpException("Incorrect price", HttpStatus.CONFLICT);

    if (!installationPrice) throw new HttpException("No installationPrice", HttpStatus.FORBIDDEN);

    if(typeof installationPrice != 'number') throw new HttpException("installationPrice must be typeof number", HttpStatus.CONFLICT);

    if (installationPrice < 0) throw new HttpException("Incorrect installationPrice", HttpStatus.CONFLICT);

    return await this.furnitureRepository
      .update(id, {
        name,
        country,
        guarantee,
        state,
        in_stock: inStock,
        price,
        installation_price: installationPrice,
        product_producer: productProducer,
        home_page: homePage,
        description,
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null) 
    throw new HttpException(`furniture with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.furnitureRepository.delete(id);
  }
}
