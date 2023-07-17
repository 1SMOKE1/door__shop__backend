import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InteriorDoorEntity } from "../interior-door.entity";
import { Repository } from "typeorm";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { CreateInteriorDoorDto } from "../dto/create-interior-door.dto";
import checkEnum from "src/utils/checkEnum";
import { CountryEnum } from "src/enums/country.enum";
import generateErrorArr from "src/utils/generateErrorArr";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { UpdateInteriorDoorDto } from "../dto/update-interior-door.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { FurnitureEntity } from "../../furniture/furniture.entity";
import { FabricMaterialWidthEntity } from "src/modules/product-constants/fabric-material-width/fabric-material-width.entity";
import { DoorIsolationEntity } from "src/modules/product-constants/door-isolation/door-isolation.entity";
import { DoorFrameMaterialEntity } from "src/modules/product-constants/door-frame-material/door-frame-material.entity";
import { DoorSelectionBoardEntity } from "src/modules/product-constants/door-selection-board/door-selection-board.entity";
import { DoorWeltEntity } from "src/modules/product-constants/door-welt/door-welt.entity";
import { DoorSlidingSystemEntity } from "src/modules/product-constants/door-sliding-system/door-sliding-system.entity";
import { ConvertingService } from "../../services/converting.service";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CheckImagesArrOnCorrect } from "src/utils/checkImagesArrOnCorrect";

@Injectable()
export class InteriorDoorService extends CheckImagesArrOnCorrect{

  getRelations = { relations: [
    'product_producer',
    'type_of_product',
    'fabric_material_width',
    'door_isolation',
    'door_frame_material',
    'door_selection_board',
    'door_welt',
    'door_hand',
    'door_mechanism',
    'door_loops',
    'door_stopper',
    'door_sliding_system'
  ]
}

  constructor(
    private readonly convertingService: ConvertingService,

    @InjectRepository(InteriorDoorEntity)
    private readonly interiorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(FabricMaterialWidthEntity)
    private readonly fabricMaterialWidthRepository: Repository<FabricMaterialWidthEntity>,
    @InjectRepository(DoorIsolationEntity)
    private readonly doorIsolationRepository: Repository<DoorIsolationEntity>,
    @InjectRepository(DoorFrameMaterialEntity)
    private readonly doorFrameMaterialRepository: Repository<DoorFrameMaterialEntity>,
    @InjectRepository(DoorSelectionBoardEntity)
    private readonly doorSelectionBoardRepository: Repository<DoorSelectionBoardEntity>,
    @InjectRepository(DoorWeltEntity)
    private readonly doorWeltRepository: Repository<DoorWeltEntity>,
    @InjectRepository(DoorSlidingSystemEntity)
    private readonly doorSlidingSystemRepository: Repository<DoorSlidingSystemEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    super();
  }

  async findAll() {
    return await this.interiorDoorRepository.find(this.getRelations);
  }

  async findById(id: number) {
    const currentProduct = await this.interiorDoorRepository.findOne({where: {id}, ...this.getRelations});

    if (currentProduct == null) throw new HttpException(`interiorDoor with id: ${id}, doesn't exists`, HttpStatus.FORBIDDEN);

    return currentProduct;
  }

  async createOne(body: CreateInteriorDoorDto, files: IImages) {
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
      fabricMaterialHeight,
      fabricMaterialWidth,
      doorIsolation,
      doorFrameMaterial,
      doorSelectionBoard,
      doorWelt,
      doorSlidingSystem,
      doorHand,
      doorMechanism,
      doorLoops,
      doorStopper,
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

    if (!(checkEnum(CountryEnum, country))) {
      const countries = generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Please create at least 1 product_producer for interiorDoor`, HttpStatus.NOT_FOUND);

    
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

    if(isNaN(+fabricMaterialThickness))
    throw new HttpException(`Incorrect fabricMaterialThickness, fabricMaterialThickness must be a number`, HttpStatus.CONFLICT);

    if(+fabricMaterialThickness < 0)
      throw new HttpException(`Incorrect fabricMaterialThickness, fabricMaterialThickness must be bigger then 0`, HttpStatus.CONFLICT);

    if(isNaN(+fabricMaterialHeight))
    throw new HttpException(`Incorrect fabricMaterialHeight, fabricMaterialHeight must be a number`, HttpStatus.CONFLICT);

    if(+fabricMaterialHeight < 0)
      throw new HttpException(`Incorrect fabricMaterialHeight, fabricMaterialHeight must be bigger then 0`, HttpStatus.CONFLICT);
  

    let fabric_material_width: FabricMaterialWidthEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(fabricMaterialWidth).length !== 0)
      fabric_material_width = await this.convertingService.findAllByCond(this.fabricMaterialWidthRepository, fabricMaterialWidth);

    let door_isolation: DoorIsolationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorIsolation).length !== 0)
      door_isolation = await this.convertingService.findAllByCond(this.doorIsolationRepository, doorIsolation);

    let door_frame_material: DoorFrameMaterialEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorFrameMaterial).length !== 0)
     door_frame_material = await this.convertingService.findAllByCond(this.doorFrameMaterialRepository, doorFrameMaterial);

    let door_selection_board: DoorSelectionBoardEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorSelectionBoard).length !== 0)
      door_selection_board = await this.convertingService.findAllByCond(this.doorSelectionBoardRepository, doorSelectionBoard);

    let door_welt: DoorWeltEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorWelt).length !== 0)
      door_welt = await this.convertingService.findAllByCond(this.doorWeltRepository, doorWelt);

    let door_hand: FurnitureEntity[] = [];
    let door_mechanism: FurnitureEntity[] = [];
    let door_loops: FurnitureEntity[] = [];
    let door_stopper: FurnitureEntity[] = [];


    if(this.convertingService.checkOnNotEmpty(doorHand).length !== 0)
      door_hand =  await this.convertingService.findAllByCond(this.furnitureRepository, doorHand);
    if(this.convertingService.checkOnNotEmpty(doorMechanism).length !== 0)
      door_mechanism = await this.convertingService.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.convertingService.checkOnNotEmpty(doorLoops).length !== 0)
      door_loops = await this.convertingService.findAllByCond(this.furnitureRepository, doorLoops);
    if(this.convertingService.checkOnNotEmpty(doorStopper).length !== 0)
      door_stopper = await this.convertingService.findAllByCond(this.furnitureRepository, doorStopper);

    let door_sliding_system: DoorSlidingSystemEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorSlidingSystem).length !== 0)
      door_sliding_system = await this.convertingService.findAllByCond(this.doorSlidingSystemRepository, doorSlidingSystem);
    
    


    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    this.checkImagesArrOnCorrect(images);

    const changedDescription = description.replace(/\s\s+/g, '<br><br><br>');

    const newProduct = this.interiorDoorRepository.create({
      name,
      product_producer,
      type_of_product,
      country,
      guarantee,
      price: +price, 
      in_stock: inStock,
      fabric_material_thickness: +fabricMaterialThickness,
      fabric_material_height: +fabricMaterialHeight,
      fabric_material_width,
      door_isolation,
      door_frame_material,
      door_selection_board,
      door_welt,
      door_hand,
      door_mechanism,
      door_loops,
      door_stopper,
      door_sliding_system,
      description: changedDescription,
      home_page: homePage,
      images: imagesPathes,
    })

    await this.cacheManager.reset();

    return await this.interiorDoorRepository.save(newProduct);

    
  }

  async updateById(id: number, body: UpdateInteriorDoorDto, files: IImages) {
    if (!body) throw new HttpException("No body", HttpStatus.BAD_REQUEST);

    const curProduct = await this.findById(id);

    if (curProduct == null) throw new HttpException(`interior_door with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const {
      name,
      productProducerName,
      typeOfProductName,
      country,
      guarantee,
      inStock,
      price,
      fabricMaterialThickness,
      fabricMaterialHeight,
      fabricMaterialWidth,
      doorIsolation,
      doorFrameMaterial,
      doorSelectionBoard,
      doorWelt,
      doorSlidingSystem,
      doorHand,
      doorMechanism,
      doorLoops,
      doorStopper,
      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Некоректний typeOfProrductName ви можете обрати з: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.interiorDoor)
    throw new HttpException(`typeOfProductName must be 'Двері міжкімнатні'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(
      `Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.interiorDoor}`, 
      HttpStatus.NOT_FOUND);

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

      throw new HttpException(`Некоректна країна, ви можете обрати з: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(GuaranteeEnum, guarantee))) {
      const guaranties = generateErrorArr(GuaranteeEnum);

      throw new HttpException(`Некоректна гарантія, ви можете обрати з: ${guaranties.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    if (!(checkEnum(InStockEnum, inStock))) {
      const inStocks = generateErrorArr(InStockEnum);

      throw new HttpException(`Некоректна наявність, ви можете обрати з: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }


    let fabric_material_width: FabricMaterialWidthEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(fabricMaterialWidth).length !== 0)
      fabric_material_width = await this.convertingService.findAllByCond(this.fabricMaterialWidthRepository, fabricMaterialWidth);

    let door_isolation: DoorIsolationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorIsolation).length !== 0)
      door_isolation = await this.convertingService.findAllByCond(this.doorIsolationRepository, doorIsolation);

    let door_frame_material: DoorFrameMaterialEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorFrameMaterial).length !== 0)
     door_frame_material = await this.convertingService.findAllByCond(this.doorFrameMaterialRepository, doorFrameMaterial);

    let door_selection_board: DoorSelectionBoardEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorSelectionBoard).length !== 0)
      door_selection_board = await this.convertingService.findAllByCond(this.doorSelectionBoardRepository, doorSelectionBoard);

    let door_welt: DoorWeltEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorWelt).length !== 0)
      door_welt = await this.convertingService.findAllByCond(this.doorWeltRepository, doorWelt);

    let door_hand: FurnitureEntity[] = [];
    let door_mechanism: FurnitureEntity[] = [];
    let door_loops: FurnitureEntity[] = [];
    let door_stopper: FurnitureEntity[] = [];


    if(this.convertingService.checkOnNotEmpty(doorHand).length !== 0)
      door_hand =  await this.convertingService.findAllByCond(this.furnitureRepository, doorHand);
    if(this.convertingService.checkOnNotEmpty(doorMechanism).length !== 0)
      door_mechanism = await this.convertingService.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.convertingService.checkOnNotEmpty(doorLoops).length !== 0)
      door_loops = await this.convertingService.findAllByCond(this.furnitureRepository, doorLoops);
    if(this.convertingService.checkOnNotEmpty(doorStopper).length !== 0)
      door_stopper = await this.convertingService.findAllByCond(this.furnitureRepository, doorStopper);

    let door_sliding_system: DoorSlidingSystemEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(doorSlidingSystem).length !== 0)
      door_sliding_system = await this.convertingService.findAllByCond(this.doorSlidingSystemRepository, doorSlidingSystem);

   
    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [...curProduct.images];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    this.checkImagesArrOnCorrect(images);

    const changedDescription = description.replace(/\s\s+/g, '<br><br><br>');

    curProduct.name = name;
    curProduct.product_producer = product_producer;
    curProduct.type_of_product = type_of_product;
    curProduct.guarantee = guarantee;
    curProduct.country = country;
    curProduct.in_stock = inStock;
    curProduct.price = +price;
    curProduct.fabric_material_thickness = +fabricMaterialThickness;
    curProduct.fabric_material_height = +fabricMaterialHeight;
    curProduct.fabric_material_width = fabric_material_width;
    curProduct.door_isolation = door_isolation;
    curProduct.door_frame_material = door_frame_material;
    curProduct.door_selection_board = door_selection_board;
    curProduct.door_welt = door_welt;
    curProduct.door_sliding_system = door_sliding_system;
    curProduct.product_producer = product_producer;
    curProduct.type_of_product = type_of_product;
    curProduct.door_hand = door_hand;
    curProduct.door_mechanism = door_mechanism;
    curProduct.door_loops = door_loops;
    curProduct.door_stopper = door_stopper;
    curProduct.home_page = homePage;
    curProduct.description = changedDescription;
    curProduct.images = imagesPathes;

    await this.cacheManager.reset();

    return await this.interiorDoorRepository.save(curProduct);
  }

  async deleteById(id: number) {
    const curItem: InteriorDoorEntity = await this.findById(id);

    if (curItem == null) throw new HttpException(`${TypeOfProductEnum.interiorDoor} з id: ${id} не існують`, HttpStatus.NOT_FOUND);

    await this.cacheManager.reset();

    return await this.interiorDoorRepository.delete(id)
    .then(() => `${TypeOfProductEnum.interiorDoor} були видалені успішно`)
  }

  async deleteAll(){
    const interiorDoorIds = await this.interiorDoorRepository.find()
    .then((data: InteriorDoorEntity[]) => 
      data.map((item: InteriorDoorEntity): number => item.id)
    );
    

    if(interiorDoorIds.length !== 0)
    await this.interiorDoorRepository.delete(interiorDoorIds);

    await this.cacheManager.reset();
    
    return `${TypeOfProductEnum.interiorDoor} були видалені успішно`
  }


}
