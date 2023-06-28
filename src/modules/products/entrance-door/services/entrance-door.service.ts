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
import { ConvertingService } from "../../services/converting.service";
import { DoorInsulationEntity } from "src/modules/product-constants/door-insulation/door-insulation.entity";
import { DoorCoveringEntity } from "src/modules/product-constants/door-covering/door-covering.entity";
import { OpeningTypeEntity } from "src/modules/product-constants/opening-type/opening-type.entity";
import { DoorSizeEntity } from "src/modules/product-constants/door-size/door-size.entity";
import { FurnitureEntity } from "../../furniture/furniture.entity";
import { DoorWeightEntity } from "src/modules/product-constants/door-weight/door-weight.entity";
import { FrameMaterialConstructionEntity } from "src/modules/product-constants/frame-material-construction/frame-material-construction.entity";
import { SealerCircuitEntity } from "src/modules/product-constants/sealer-circuit/sealer-circuit.entity";



@Injectable()
export class EntranceDoorService {

  private getRelations = { relations: [
      'product_producer',
      'type_of_product',
      'door_insulation',
      'covering',
      'size',
      'lower_lock',
      'upper_lock',
      'door_hand',
      'opening_type',
      'weight',
      'frame_material_construction',
      'sealer_circuit'
    ] 
  }

  constructor(
    private readonly convertingService: ConvertingService,
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @InjectRepository(DoorInsulationEntity)
    private readonly doorInsulationRepository: Repository<DoorInsulationEntity>,
    @InjectRepository(DoorCoveringEntity)
    private readonly doorCoveringRepository: Repository<DoorCoveringEntity>,
    @InjectRepository(OpeningTypeEntity)
    private readonly doorOpeningTypeRepository: Repository<OpeningTypeEntity>,
    @InjectRepository(DoorSizeEntity)
    private readonly doorSizeRepository: Repository<DoorSizeEntity>,
    @InjectRepository(FurnitureEntity)
    private readonly  furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(DoorWeightEntity)
    private readonly doorWeightRepository: Repository<DoorWeightEntity>,
    @InjectRepository(FrameMaterialConstructionEntity)
    private readonly doorFrameMaterialConstructionRepository: Repository<FrameMaterialConstructionEntity>,
    @InjectRepository(SealerCircuitEntity)
    private readonly sealerCircuitRepository: Repository<SealerCircuitEntity>,



  ) {}

  async findAll() {
    return await this.entranceDoorRepository.find(this.getRelations);
  }

  async findById(id: number) {
 
    const currentProduct = await this.entranceDoorRepository.findOne({where: {id}, ...this.getRelations});

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
      fabricMaterialThickness,
      frameMaterialThickness,
      doorInsulation,
      covering,
      doorPeephole,
      openingType,
      size,
      lowerLock,
      upperLock,
      doorHand,
      weight,
      metalThickness,
      frameMaterialConstruction,
      sealerCircuit,
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

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.entranceDoor}`, HttpStatus.NOT_FOUND);

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

    let door_insulation: DoorInsulationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorInsulation).length !== 0)
      door_insulation = await this.convertingService.findAllByCond(this.doorInsulationRepository, doorInsulation);
    
    let door_covering: DoorCoveringEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(covering).length !== 0)
      door_covering = await this.convertingService.findAllByCond(this.doorCoveringRepository, covering);

    let opening_type: OpeningTypeEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(openingType).length !== 0)
      opening_type = await this.convertingService.findAllByCond(this.doorOpeningTypeRepository, openingType);

    let door_size: DoorSizeEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(size).length !== 0)
      door_size = await this.convertingService.findAllByCond(this.doorSizeRepository, size);

    let lower_lock: FurnitureEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(lowerLock).length !== 0)
      lower_lock = await this.convertingService.findAllByCond(this.furnitureRepository, lowerLock);

    let upper_lock: FurnitureEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(upperLock).length !== 0)
      upper_lock = await this.convertingService.findAllByCond(this.furnitureRepository, upperLock);

    let door_hand: FurnitureEntity[] = [];
    
    if(this.convertingService.checkOnNotEmpty(doorHand).length !== 0)
      door_hand = await this.convertingService.findAllByCond(this.furnitureRepository, doorHand);

    let door_weight: DoorWeightEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(weight).length !== 0)
      door_weight = await this.convertingService.findAllByCond(this.doorWeightRepository, weight);

    let frame_material_construction: FrameMaterialConstructionEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(frameMaterialConstruction).length !== 0)
      frame_material_construction = await this.convertingService.findAllByCond(this.doorFrameMaterialConstructionRepository, frameMaterialConstruction);

    let sealer_circuit: SealerCircuitEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(sealerCircuit).length !== 0)
      sealer_circuit = await this.convertingService.findAllByCond(this.sealerCircuitRepository, sealerCircuit);

    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const changedDescription = description.replace(/\s\s+/g, '\\n\\n\\n');

    const newProduct = this.entranceDoorRepository.create({
      name,
      country,
      guarantee,
      in_stock: inStock,
      price: +price,
      product_producer,
      type_of_product,
      fabric_material_thickness: +fabricMaterialThickness,
      frame_material_thickness: +frameMaterialThickness,
      door_insulation,
      covering: door_covering,
      door_peephole: doorPeephole,
      opening_type,
      size: door_size,
      lower_lock,
      upper_lock,
      door_hand,
      weight: door_weight,
      metal_thickness: +metalThickness,
      frame_material_construction,
      sealer_circuit,
      home_page: homePage,
      description: changedDescription,
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
      fabricMaterialThickness,
      frameMaterialThickness,
      doorInsulation,
      covering,
      doorPeephole,
      openingType,
      size,
      lowerLock,
      upperLock,
      doorHand,
      weight,
      metalThickness,
      frameMaterialConstruction,
      sealerCircuit,


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

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.entranceDoor}`, HttpStatus.NOT_FOUND);

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

    let door_insulation: DoorInsulationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorInsulation).length !== 0)
      door_insulation = await this.convertingService.findAllByCond(this.doorInsulationRepository, doorInsulation);
    
    let door_covering: DoorCoveringEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(covering).length !== 0)
      door_covering = await this.convertingService.findAllByCond(this.doorCoveringRepository, covering);

    let opening_type: OpeningTypeEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(openingType).length !== 0)
      opening_type = await this.convertingService.findAllByCond(this.doorOpeningTypeRepository, openingType);

    let door_size: DoorSizeEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(size).length !== 0)
      door_size = await this.convertingService.findAllByCond(this.doorSizeRepository, size);

    let lower_lock: FurnitureEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(lowerLock).length !== 0)
      lower_lock = await this.convertingService.findAllByCond(this.furnitureRepository, lowerLock);

    let upper_lock: FurnitureEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(upperLock).length !== 0)
      upper_lock = await this.convertingService.findAllByCond(this.furnitureRepository, upperLock);

    let door_hand: FurnitureEntity[] = [];
    
    if(this.convertingService.checkOnNotEmpty(doorHand).length !== 0)
      door_hand = await this.convertingService.findAllByCond(this.furnitureRepository, doorHand);

    let door_weight: DoorWeightEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(weight).length !== 0)
      door_weight = await this.convertingService.findAllByCond(this.doorWeightRepository, weight);

    let frame_material_construction: FrameMaterialConstructionEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(frameMaterialConstruction).length !== 0)
      frame_material_construction = await this.convertingService.findAllByCond(this.doorFrameMaterialConstructionRepository, frameMaterialConstruction);
  
    let sealer_circuit: SealerCircuitEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(sealerCircuit).length !== 0)
      sealer_circuit = await this.convertingService.findAllByCond(this.sealerCircuitRepository, sealerCircuit);

     // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [...curProduct.images];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const changedDescription = description.replace(/\s\s+/g, '\\n\\n\\n');

    

    curProduct.name = name;
    curProduct.product_producer = product_producer;
    curProduct.type_of_product = type_of_product;
    curProduct.guarantee = guarantee;
    curProduct.country = country;
    curProduct.in_stock = inStock;
    curProduct.price = +price;
    curProduct.fabric_material_thickness = +fabricMaterialThickness;
    curProduct.frame_material_thickness = +frameMaterialThickness;
    curProduct.door_insulation = door_insulation;
    curProduct.covering = door_covering;
    curProduct.door_peephole = doorPeephole;
    curProduct.opening_type = opening_type;
    curProduct.size = door_size;
    curProduct.lower_lock = lower_lock;
    curProduct.upper_lock = upper_lock;
    curProduct.door_hand = door_hand;
    curProduct.weight = door_weight;
    curProduct.metal_thickness = +metalThickness;
    curProduct.frame_material_construction = frame_material_construction;
    curProduct.sealer_circuit = sealer_circuit;
    curProduct.home_page = homePage;
    curProduct.description = changedDescription;
    curProduct.images = imagesPathes;
    
    return await this.entranceDoorRepository.save(curProduct);
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
