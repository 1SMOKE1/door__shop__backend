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

@Injectable()
export class InteriorDoorService {
  constructor(
    @InjectRepository(InteriorDoorEntity)
    private readonly interiorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>
  ) {}

  async findAll() {
    return await this.interiorDoorRepository.find({ relations: { product_producer: true, type_of_product: true } });
  }

  async findById(id: number) {
    const currentProduct = await this.interiorDoorRepository.findOne({ where: { id }, relations: { product_producer: true, type_of_product: true } });

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

    let door_hand: FurnitureEntity[] = [];
    let door_mechanism: FurnitureEntity[] = []
    let door_loops: FurnitureEntity[] = [];
    let door_stopper: FurnitureEntity[] = [];


    if(this.checkOnNotEmpty(doorHand).length !== 0)
      door_hand =  await this.findAllByCond(doorHand);
    if(this.checkOnNotEmpty(doorMechanism).length !== 0)
      door_mechanism = await this.findAllByCond(doorMechanism);
    if(this.checkOnNotEmpty(doorLoops).length !== 0)
      door_loops = await this.findAllByCond(doorMechanism);
    if(this.checkOnNotEmpty(doorStopper).length !== 0)
      door_stopper = await this.findAllByCond(doorStopper);
    
    

    


    

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
      fabric_material_width: fabricMaterialWidth,
      door_isolation: doorIsolation,
      door_frame_material: doorFrameMaterial,
      door_selection_board: doorSelectionBoard,
      door_welt: doorWelt,
      door_sliding_system: doorSlidingSystem,
      door_hand,
      door_mechanism,
      door_loops,
      door_stopper,
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


    const door_hand = await this.findAllByCond(doorHand);
    const door_mechanism = await this.findAllByCond(doorMechanism);
    const door_loops = await this.findAllByCond(doorLoops);
    const door_stopper = await this.findAllByCond(doorStopper);
   
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
        in_stock: inStock,
        price,
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

  private async findAllByCond(obj: string[]): Promise<FurnitureEntity[]>{
    return await Promise.all(
      obj.map(p =>  
        new Promise((res) => res(p))
          .then((el: string) => 
            this.furnitureRepository.findOneByOrFail({name: el})))
    );
  }

  private checkOnNotEmpty(val: string[] | null | undefined): string[] | null{
    if(val)
      switch(true){
        case val[0] === '':
          return [];
        case val[0] !== '':
          return [...val];
        default: 
          return null;
      }
    return null
  }

}
