import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InteriorDoorEntity } from '../interior-door.entity';
import { Repository } from 'typeorm';
import { ProductProducerEntity } from 'src/modules/product-producers/product-producer.entity';
import { CreateInteriorDoorDto } from '../dto/create-interior-door.dto';
import checkEnum from 'src/utils/checkEnum';
import { CountryEnum } from 'src/enums/country.enum';
import generateErrorArr from 'src/utils/generateErrorArr';
import { GuaranteeEnum } from 'src/enums/guarantee.enum';
import { StateEnum } from 'src/enums/state.enum';
import { InStockEnum } from 'src/enums/in-stock.enum';
import fieldTypeOfArr from 'src/utils/fieldTypeOfArr';
import { FrameMaterialInteriorDoorEnum } from 'src/enums/frame-material-interior-door.enum';
import { FinishingTheSurfaceEnum } from 'src/enums/finishing-the-surface.enum';
import checkArrFieldByEnum from 'src/utils/checkArrFieldByEnum';
import { StructuralFeaturesEnum } from 'src/enums/structural-features.enum';
import { OpeningMethodEnum } from 'src/enums/opening-method.enum';
import { OpeningTypeEnum } from 'src/enums/opening-type.enum';
import { InstallationTypeEnum } from 'src/enums/installation-type.enum';
import { UpdateInteriorDoorDto } from '../dto/update-interior-door.dto';

@Injectable()
export class InteriorDoorService {

  constructor(
    @InjectRepository(InteriorDoorEntity)
    private readonly interorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>
  ){}

  async findAll(){
    return await this.interorDoorRepository.find({ relations: { product_producer: true } });
  }

  async findById(id: number){
    
    const currentProduct = await this.interorDoorRepository.findOne({where: {id}, relations: {product_producer: true}});

    if(currentProduct == null) throw new HttpException(`interiorDoor with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateInteriorDoorDto) {
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
      finishingTheSurface,
      frameMaterial,
      structuralFeatures,
      openingType,
      installationType,
      openingMethod,
      homePage,
      description,
    } = body;

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

    // finishingTheSurface: string[] // Оздоблення поверхні
    if (!finishingTheSurface) throw new HttpException("No finishingTheSurface", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(finishingTheSurface);

    await checkArrFieldByEnum(FinishingTheSurfaceEnum, finishingTheSurface, "finishingTheSurface");

    // frameMaterial: string[] // Матеріали дверної коробки
    if (!frameMaterial) throw new HttpException("No frameMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(frameMaterial);

    await checkArrFieldByEnum(FrameMaterialInteriorDoorEnum, frameMaterial, "frameMaterial");

    // structuralFeatures: string[] // Конструктивні особливості
    if (!structuralFeatures) throw new HttpException("No structuralFeatures", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(structuralFeatures);

    await checkArrFieldByEnum(StructuralFeaturesEnum, structuralFeatures, "structuralFeatures");

    // openingType: string[] // Тип відкривання
    if (!openingType) throw new HttpException("No openingType", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingType);

    await checkArrFieldByEnum(OpeningTypeEnum, openingType, "openingType");

    if (!installationType) throw new HttpException("No installationType", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(installationType);

    await checkArrFieldByEnum(InstallationTypeEnum, installationType, "installationType");

    // openingMethod: string[] // Спосіб відкривання
    if (!openingMethod) throw new HttpException("No openingMethod", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingMethod);

    await checkArrFieldByEnum(OpeningMethodEnum, openingMethod, "openingMethod");


    const newProduct = this.interorDoorRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      finishing_the_surface: finishingTheSurface,
      frame_material: frameMaterial,
      structural_features: structuralFeatures,
      opening_type: openingType,
      installation_type: installationType,
      opening_method: openingMethod,
      home_page: homePage,
      description,
    });
    return await this.interorDoorRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateInteriorDoorDto){
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    if ((await this.findById(id)) == null) throw new HttpException(`interior_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      finishingTheSurface,
      frameMaterial,
      structuralFeatures,
      openingType,
      installationType,
      openingMethod,
      homePage,
      description,
    } = body;

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

    // finishingTheSurface: string[] // Оздоблення поверхні
    if (!finishingTheSurface) throw new HttpException("No finishingTheSurface", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(finishingTheSurface);

    await checkArrFieldByEnum(FinishingTheSurfaceEnum, finishingTheSurface, "finishingTheSurface");

    // frameMaterial: string[] // Матеріали дверної коробки
    if (!frameMaterial) throw new HttpException("No frameMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(frameMaterial);

    await checkArrFieldByEnum(FrameMaterialInteriorDoorEnum, frameMaterial, "frameMaterial");

    // structuralFeatures: string[] // Конструктивні особливості
    if (!structuralFeatures) throw new HttpException("No structuralFeatures", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(structuralFeatures);

    await checkArrFieldByEnum(StructuralFeaturesEnum, structuralFeatures, "structuralFeatures");

    // openingType: string[] // Тип відкривання
    if (!openingType) throw new HttpException("No openingType", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingType);

    await checkArrFieldByEnum(OpeningTypeEnum, openingType, "openingType");

    if (!installationType) throw new HttpException("No installationType", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(installationType);

    await checkArrFieldByEnum(InstallationTypeEnum, installationType, "installationType");

    // openingMethod: string[] // Спосіб відкривання
    if (!openingMethod) throw new HttpException("No openingMethod", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingMethod);

    await checkArrFieldByEnum(OpeningMethodEnum, openingMethod, "openingMethod");

    return await this.interorDoorRepository.update(id, {
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      finishing_the_surface: finishingTheSurface,
      frame_material: frameMaterial,
      structural_features: structuralFeatures,
      opening_type: openingType,
      installation_type: installationType,
      opening_method: openingMethod,
      home_page: homePage,
      description,
    })
    .then(() => this.findById(id));
  }

  async deleteById(id: number){
    if ((await this.findById(id)) == null) throw new HttpException(`interior_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.interorDoorRepository.delete(id);
  }



}
