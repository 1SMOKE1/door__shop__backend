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

@Injectable()
export class InteriorDoorService {

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
    private readonly doorSlidingSystemRepository: Repository<DoorSlidingSystemEntity>
  ) {}

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

    if (!(await checkEnum(CountryEnum, country))) {
      const countries = await generateErrorArr(CountryEnum);

      throw new HttpException(`Incorrect country, you could choose from: ${countries.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

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

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }

    const allFurniture = await this.furnitureRepository.find();

    if(allFurniture.length === 0)
    throw new HttpException('Create at least 1 furniture item', HttpStatus.CONFLICT);

    let fabric_material_width: FabricMaterialWidthEntity[] = [];

    if(this.checkOnNotEmpty(fabricMaterialWidth).length !== 0)
      fabric_material_width = await this.findAllByCond(this.fabricMaterialWidthRepository, fabricMaterialWidth);

    let door_isolation: DoorIsolationEntity[] = [];

    if(this.checkOnNotEmpty(doorIsolation).length !== 0)
      door_isolation = await this.findAllByCond(this.doorIsolationRepository, doorIsolation);

    let door_frame_material: DoorFrameMaterialEntity[] = [];

    if(this.checkOnNotEmpty(doorFrameMaterial).length !== 0)
     door_frame_material = await this.findAllByCond(this.doorFrameMaterialRepository, doorFrameMaterial);

    let door_selection_board: DoorSelectionBoardEntity[] = [];

    if(this.checkOnNotEmpty(doorSelectionBoard).length !== 0)
      door_selection_board = await this.findAllByCond(this.doorSelectionBoardRepository, doorSelectionBoard);

    let door_welt: DoorWeltEntity[] = [];

    if(this.checkOnNotEmpty(doorWelt).length !== 0)
      door_welt = await this.findAllByCond(this.doorWeltRepository, doorWelt);

    let door_hand: FurnitureEntity[] = [];
    let door_mechanism: FurnitureEntity[] = [];
    let door_loops: FurnitureEntity[] = [];
    let door_stopper: FurnitureEntity[] = [];


    if(this.checkOnNotEmpty(doorHand).length !== 0)
      door_hand =  await this.findAllByCond(this.furnitureRepository, doorHand);
    if(this.checkOnNotEmpty(doorMechanism).length !== 0)
      door_mechanism = await this.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.checkOnNotEmpty(doorLoops).length !== 0)
      door_loops = await this.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.checkOnNotEmpty(doorStopper).length !== 0)
      door_stopper = await this.findAllByCond(this.furnitureRepository, doorStopper);

    let door_sliding_system: DoorSlidingSystemEntity[] = [];

    if(this.checkOnNotEmpty(doorSlidingSystem).length !== 0)
      door_sliding_system = await this.findAllByCond(this.doorSlidingSystemRepository, doorSlidingSystem);
    
    


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

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

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

    if (!(await checkEnum(InStockEnum, inStock))) {
      const inStocks = await generateErrorArr(InStockEnum);

      throw new HttpException(`Incorrect inStock, you could choose from: ${inStocks.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }


    let fabric_material_width: FabricMaterialWidthEntity[] = [];

    if(this.checkOnNotEmpty(fabricMaterialWidth).length !== 0)
      fabric_material_width = await this.findAllByCond(this.fabricMaterialWidthRepository, fabricMaterialWidth);

    let door_isolation: DoorIsolationEntity[] = [];

    if(this.checkOnNotEmpty(doorIsolation).length !== 0)
      door_isolation = await this.findAllByCond(this.doorIsolationRepository, doorIsolation);

    let door_frame_material: DoorFrameMaterialEntity[] = [];

    if(this.checkOnNotEmpty(doorFrameMaterial).length !== 0)
     door_frame_material = await this.findAllByCond(this.doorFrameMaterialRepository, doorFrameMaterial);

    let door_selection_board: DoorSelectionBoardEntity[] = [];

    if(this.checkOnNotEmpty(doorSelectionBoard).length !== 0)
      door_selection_board = await this.findAllByCond(this.doorSelectionBoardRepository, doorSelectionBoard);

    let door_welt: DoorWeltEntity[] = [];

    if(this.checkOnNotEmpty(doorWelt).length !== 0)
      door_welt = await this.findAllByCond(this.doorWeltRepository, doorWelt);

    let door_hand: FurnitureEntity[] = [];
    let door_mechanism: FurnitureEntity[] = [];
    let door_loops: FurnitureEntity[] = [];
    let door_stopper: FurnitureEntity[] = [];


    if(this.checkOnNotEmpty(doorHand).length !== 0)
      door_hand =  await this.findAllByCond(this.furnitureRepository, doorHand);
    if(this.checkOnNotEmpty(doorMechanism).length !== 0)
      door_mechanism = await this.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.checkOnNotEmpty(doorLoops).length !== 0)
      door_loops = await this.findAllByCond(this.furnitureRepository, doorMechanism);
    if(this.checkOnNotEmpty(doorStopper).length !== 0)
      door_stopper = await this.findAllByCond(this.furnitureRepository, doorStopper);

    let door_sliding_system: DoorSlidingSystemEntity[] = [];

    if(this.checkOnNotEmpty(doorSlidingSystem).length !== 0)
      door_sliding_system = await this.findAllByCond(this.doorSlidingSystemRepository, doorSlidingSystem);

   
    // IMAGES

    const { images } = files;

    let imagesPathes: string[] = [...curProduct.images];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    const updatedInteriorDoor = this.interiorDoorRepository.create({
      name,
      country,
      guarantee,
      in_stock: inStock,
      price,
      fabric_material_thickness: +fabricMaterialThickness,
      fabric_material_height: +fabricMaterialHeight,
      fabric_material_width,
      door_isolation,
      door_frame_material,
      door_selection_board,
      door_welt,
      door_sliding_system,
      product_producer,
      type_of_product,
      door_hand, 
      door_mechanism,
      door_loops,
      door_stopper,
      home_page: homePage,
      description,
      images: imagesPathes
    })

    const [,newItem]= await Promise.all([
      this.interiorDoorRepository.delete(id),
      this.interiorDoorRepository.save(updatedInteriorDoor)
    ])

    return newItem
    
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

  private async findAllByCond(repository: Repository<any>, obj: string[]): Promise<FurnitureEntity[]>{
    return await Promise.all(
      obj.map(p =>  
        new Promise((res) => res(p))
          .then((el: string) => 
            repository.findOneByOrFail({name: el})))
    )
  }

  private checkOnNotEmpty(val: string[]| null | undefined): string[]{
    if(val)
      switch(true){
        case val[0] === '':
          return [];
        case val[0] !== '':
          return [...val];
        default: 
          return [];
      }
    return []
  }

}
