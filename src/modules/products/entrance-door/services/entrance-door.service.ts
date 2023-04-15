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
import checkArrFieldByEnum from "src/utils/checkArrFieldByEnum";
import { AmountOfSealingMaterialsEnum } from "src/enums/amount-of-sealing-materials.enum";
import fieldTypeOfArr from "src/utils/fieldTypeOfArr";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { PuproseEnum } from "src/enums/purpose.enum";
import { CoveringEnum } from "src/enums/covering.enum";
import { FrameMaterialEntranceDoorEnum } from "src/enums/frame-material-entrance-door.enum";
import { UpdateEntranceDoorDto } from "../dto/update-entrance-door.dto";
import { FabricMaterialEnum } from "src/enums/fabric-material.enum";

@Injectable()
export class EntranceDoorService {
  constructor(
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
  ) {}

  async findAll() {
    return await this.entranceDoorRepository.find({ relations: { product_producer: true } });
  }

  async findById(id: number) {
    const currentProduct = await this.entranceDoorRepository.findOne({where: {id}, relations: { product_producer: true}});

    if (currentProduct == null) throw new HttpException(`entrance_door with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateEntranceDoorDto) {
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
      amountOfSealingMaterials,
      fabricMaterial,
      openingMethod,
      covering,
      purpose,
      frameMaterial,
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

    // amountOfSealingMaterials: string[] // Кількість ущільнюючих контурів
    if (!amountOfSealingMaterials) throw new HttpException("No amountOfSealingMaterials", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(amountOfSealingMaterials);

    await checkArrFieldByEnum(AmountOfSealingMaterialsEnum, amountOfSealingMaterials, "amountOfSealingMaterials");

    // fabricMaterial: string[] // Матеріл дверного полотна
    if (!fabricMaterial) throw new HttpException("No fabricMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(fabricMaterial);

    await checkArrFieldByEnum(FabricMaterialEnum, fabricMaterial, "fabricMaterial");

    // purpose: string[] // Призначення двері
    if (!purpose) throw new HttpException("No purpose", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(purpose);

    await checkArrFieldByEnum(PuproseEnum, purpose, "purpose");

    // openingMethod: string[] // Спосіб відкривання
    if (!openingMethod) throw new HttpException("No openingMethod", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingMethod);

    await checkArrFieldByEnum(OpeningMethodEnum, openingMethod, "openingMethod");

    // covering: string[] // Покриття
    if (!covering) throw new HttpException("No covering", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(covering);

    await checkArrFieldByEnum(CoveringEnum, covering, "covering");

    // frameMaterial: string[] // Матеріал дверної коробки
    if (!frameMaterial) throw new HttpException("No frameMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(frameMaterial);

    await checkArrFieldByEnum(FrameMaterialEntranceDoorEnum, frameMaterial, "frameMaterial");

    const newProduct = this.entranceDoorRepository.create({
      name,
      country,
      guarantee,
      state,
      in_stock: inStock,
      price,
      installation_price: installationPrice,
      product_producer: productProducer,
      amount_of_sealing_materials: amountOfSealingMaterials,
      fabric_material: fabricMaterial,
      opening_method: openingMethod,
      covering,
      purpose,
      frame_material: frameMaterial,
      home_page: homePage,
      description,
    });
    return await this.entranceDoorRepository.save(newProduct);
  }

  async updateById(id: number, body: UpdateEntranceDoorDto) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    if ((await this.findById(id)) == null) throw new HttpException(`entrance_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      country,
      guarantee,
      state,
      inStock,
      price,
      installationPrice,
      productProducerName,
      amountOfSealingMaterials,
      fabricMaterial,
      openingMethod,
      covering,
      purpose,
      frameMaterial,
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

    if (!country) throw new HttpException("No country", HttpStatus.FORBIDDEN);

    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!guarantee) throw new HttpException("No guarantee", HttpStatus.FORBIDDEN);

    if (!(await checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = await generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Incorrect guarantee, you could choose from: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!state) throw new HttpException("No state", HttpStatus.FORBIDDEN);

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

    // amountOfSealingMaterials: string[] // Кількість ущільнюючих контурів
    if (!amountOfSealingMaterials) throw new HttpException("No amountOfSealingMaterials", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(amountOfSealingMaterials);

    await checkArrFieldByEnum(AmountOfSealingMaterialsEnum, amountOfSealingMaterials, "amountOfSealingMaterials");

    // fabricMaterial: string[] // Матеріл дверного полотна
    if (!fabricMaterial) throw new HttpException("No fabricMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(fabricMaterial);

    await checkArrFieldByEnum(FabricMaterialEnum, fabricMaterial, "fabricMaterial");

    // purpose: string[] // Призначення двері
    if (!purpose) throw new HttpException("No purpose", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(purpose);

    await checkArrFieldByEnum(PuproseEnum, purpose, "purpose");

    // openingMethod: string[] // Спосіб відкривання
    if (!openingMethod) throw new HttpException("No openingMethod", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(openingMethod);

    await checkArrFieldByEnum(OpeningMethodEnum, openingMethod, "openingMethod");

    // covering: string[] // Покриття
    if (!covering) throw new HttpException("No covering", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(covering);

    await checkArrFieldByEnum(CoveringEnum, covering, "covering");

    // frameMaterial: string[] // Матеріал дверної коробки
    if (!frameMaterial) throw new HttpException("No frameMaterial", HttpStatus.FORBIDDEN);

    await fieldTypeOfArr(frameMaterial);

    await checkArrFieldByEnum(FrameMaterialEntranceDoorEnum, frameMaterial, "frameMaterial");

    return await this.entranceDoorRepository
      .update(id, {
        name,
        country,
        guarantee,
        state,
        in_stock: inStock,
        price,
        installation_price: installationPrice,
        product_producer: productProducer,
        amount_of_sealing_materials: amountOfSealingMaterials,
        fabric_material: fabricMaterial,
        opening_method: openingMethod,
        covering,
        purpose,
        frame_material: frameMaterial,
        home_page: homePage,
        description,
      })
      .then(() => this.findById(id));
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null) throw new HttpException(`entrance_door with current id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.entranceDoorRepository.delete(id);
  }
}
