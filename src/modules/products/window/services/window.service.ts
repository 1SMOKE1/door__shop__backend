import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WindowEntity } from '../window.entity';
import { Repository } from 'typeorm';
import { CreateWindowDto } from '../dto/create-window.dto';
import { ProductProducerEntity } from 'src/modules/product-producers/product-producer.entity';
import { CountryEnum } from 'src/enums/country.enum';
import { GuaranteeEnum } from 'src/enums/guarantee.enum';
import { InStockEnum } from 'src/enums/in-stock.enum';
import { StateEnum } from 'src/enums/state.enum';
import checkArrFieldByEnum from 'src/utils/checkArrFieldByEnum';
import checkEnum from 'src/utils/checkEnum';
import fieldTypeOfArr from 'src/utils/fieldTypeOfArr';
import generateErrorArr from 'src/utils/generateErrorArr';
import { ProfileWindowEnum } from 'src/enums/profile-window.enum';
import { ConstructionWindowEnum } from 'src/enums/construction-window.enum';
import { GlassUnitWindowEnum } from 'src/enums/glass-unit-window.enum';
import { LaminationWindowEnum } from 'src/enums/lamination-window.enum';
import { GlassesWindowEnum } from 'src/enums/glasses-window.enum';
import { UpdateWindowDto } from '../dto/update-window.dto';

@Injectable()
export class WindowService {

  constructor(
    @InjectRepository(WindowEntity)
    private readonly windowRepository: Repository<WindowEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>
  ){}

  async findAll(){
    return await this.windowRepository.find({relations: {product_producer: true}})
  }

  async findById(id: number){
    
    const currentProduct = await this.windowRepository.findOne({where: {id}, relations: {product_producer: true}})

    if (currentProduct == null) throw new HttpException(`window with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateWindowDto){
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
      profile,
      construction,
      glassUnit,
      lamination,
      glasses,
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

    // profile: string[] // Профіль
    if (!profile) throw new HttpException("No profile", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(profile);

    await checkArrFieldByEnum(ProfileWindowEnum, profile, "profile");

    //construction:  string[] // Конструкція
    if (!construction) throw new HttpException("No construction", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(construction);

    await checkArrFieldByEnum(ConstructionWindowEnum, construction, "construction");

    // glassUnit: string[] // Стеклопакети
    if (!glassUnit) throw new HttpException("No glassUnit", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(glassUnit);

    await checkArrFieldByEnum(GlassUnitWindowEnum, glassUnit, "glassUnit");

    // lamination: string [] // Ламінація
    if (!lamination) throw new HttpException("No lamination", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(lamination);

    await checkArrFieldByEnum(LaminationWindowEnum, lamination, "lamination");

    // glasses: string[] // Стекла
    if (!glasses) throw new HttpException("No glasses", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(glasses);

    await checkArrFieldByEnum(GlassesWindowEnum, glasses, "glasses");


    const newProduct = this.windowRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      profile,
      construction,
      glass_unit: glassUnit,
      lamination,
      glasses,
      home_page: homePage,
      description,
    });
    return await this.windowRepository.save(newProduct);
  }
  
  async updateById(id: number, body: UpdateWindowDto){
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    if ((await this.findById(id)) == null) throw new HttpException(`window with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      profile,
      construction,
      glassUnit,
      lamination,
      glasses,
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

    // profile: string[] // Профіль
    if (!profile) throw new HttpException("No profile", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(profile);

    await checkArrFieldByEnum(ProfileWindowEnum, profile, "profile");

    //construction:  string[] // Конструкція
    if (!construction) throw new HttpException("No construction", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(construction);

    await checkArrFieldByEnum(ConstructionWindowEnum, construction, "construction");

    // glassUnit: string[] // Стеклопакети
    if (!glassUnit) throw new HttpException("No glassUnit", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(glassUnit);

    await checkArrFieldByEnum(GlassUnitWindowEnum, glassUnit, "glassUnit");

    // lamination: string [] // Ламінація
    if (!lamination) throw new HttpException("No lamination", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(lamination);

    await checkArrFieldByEnum(LaminationWindowEnum, lamination, "lamination");

    // glasses: string[] // Стекла
    if (!glasses) throw new HttpException("No glasses", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(glasses);

    await checkArrFieldByEnum(GlassesWindowEnum, glasses, "glasses");


    return await this.windowRepository.update(id, {
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      profile,
      construction,
      glass_unit: glassUnit,
      lamination,
      glasses,
      home_page: homePage,
      description,
    })
    .then(() => this.findById(id));
    
  }

  async deleteById(id: number){
    if ((await this.findById(id)) == null) 
    throw new HttpException(`window with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.windowRepository.delete(id);
  }
}
