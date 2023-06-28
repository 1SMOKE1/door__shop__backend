import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WindowEntity } from "../window.entity";
import { Repository } from "typeorm";
import { CreateWindowDto } from "../dto/create-window.dto";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import checkEnum from "src/utils/checkEnum";
import generateErrorArr from "src/utils/generateErrorArr";
import { UpdateWindowDto } from "../dto/update-window.dto";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { IImages } from "src/interfaces/IImages";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { MosquitNetEntity } from "src/modules/product-constants/mosquit-net/mosquit-net.entity";
import { ConvertingService } from "../../services/converting.service";
import { WindowSillEntity } from "src/modules/product-constants/window-sill/window-sill.entity";
import { WindowEbbEntity } from "src/modules/product-constants/window-ebb/window-ebb.entity";
import { WindowHandEntity } from "src/modules/product-constants/window-hand/window-hand.entity";
import { ChildLockEntity } from "src/modules/product-constants/child-lock/child-lock.entity";
import { HousewifeStubEntity } from "src/modules/product-constants/housewife-stub/housewife-stub.entity";
import { GlassPocketAddEntity } from "src/modules/product-constants/glass-pocket-add/glass-pocket-add.entity";
import { WindowLaminationEntity } from "src/modules/product-constants/window-lamination/window-lamination.entity";
import { WindowProfileEntity } from "src/modules/product-constants/window-profile/window-profile.entity";
import { CamerasCountEntity } from "src/modules/product-constants/cameras-count/cameras-count.entity";
import { FeaturesEntity } from "src/modules/product-constants/features/features.entity";
import { SectionCountEntity } from "src/modules/product-constants/section-count/section-count.entity";

@Injectable()
export class WindowService {
  constructor(
    private readonly convertingService: ConvertingService,
    @InjectRepository(WindowEntity)
    private readonly windowRepository: Repository<WindowEntity>,
    @InjectRepository(ProductProducerEntity)
    private readonly productProducerRepository: Repository<ProductProducerEntity>,
    @InjectRepository(TypeOfProductEntity)
    private readonly typeOfProductRepository: Repository<TypeOfProductEntity>,
    @InjectRepository(MosquitNetEntity)
    private readonly mosquitoNetRepository: Repository<MosquitNetEntity>,
    @InjectRepository(WindowSillEntity)
    private readonly windowSillRepository: Repository<WindowSillEntity>,
    @InjectRepository(WindowEbbEntity)
    private readonly windowEbbRepository: Repository<WindowEbbEntity>,
    @InjectRepository(WindowHandEntity)
    private readonly windowHandRepository: Repository<WindowHandEntity>,
    @InjectRepository(ChildLockEntity)
    private readonly childLockRepository: Repository<ChildLockEntity>,
    @InjectRepository(HousewifeStubEntity)
    private readonly houseWifeStubRepository: Repository<HousewifeStubEntity>,
    @InjectRepository(GlassPocketAddEntity)
    private readonly glassPocketAddRepository: Repository<GlassPocketAddEntity>,
    @InjectRepository(WindowLaminationEntity)
    private readonly laminationRepository: Repository<WindowLaminationEntity>,
    @InjectRepository(WindowProfileEntity)
    private readonly profileRepository: Repository<WindowProfileEntity>,
    @InjectRepository(CamerasCountEntity)
    private readonly camerasCountRepository: Repository<CamerasCountEntity>,
    @InjectRepository(FeaturesEntity)
    private readonly featuresRepository: Repository<FeaturesEntity>,
    @InjectRepository(SectionCountEntity)
    private readonly sectionCountRepository: Repository<SectionCountEntity>
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
      inStock,
      price,
      productProducerName,
      typeOfProductName,
      mosquitoNet,
      windowSill,
      windowEbb,
      windowHand,
      childLock,
      housewifeStub,
      glassPocketAdd,
      lamination,
      profile,
      windowWidth,
      windowHeight,
      camerasCount,
      features,
      sectionCount,
      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.windows)
    throw new HttpException(`typeOfProductName must be 'Вікна'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.windows}`, HttpStatus.NOT_FOUND);

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

    let mosquito_net: MosquitNetEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(mosquitoNet).length !== 0)
      mosquito_net = await this.convertingService.findAllByCond(this.mosquitoNetRepository, mosquitoNet);

    let window_sill: WindowSillEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowSill).length !== 0)
      window_sill = await this.convertingService.findAllByCond(this.windowSillRepository, windowSill);

    let window_ebb: WindowEbbEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowEbb).length !== 0)
      window_ebb = await this.convertingService.findAllByCond(this.windowEbbRepository, windowEbb);

    let window_hand: WindowHandEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowHand).length !== 0)
      window_hand = await this.convertingService.findAllByCond(this.windowHandRepository, windowHand);

    let child_lock: ChildLockEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(childLock).length !== 0)
      child_lock = await this.convertingService.findAllByCond(this.childLockRepository, childLock);

    let housewife_stub: HousewifeStubEntity[] = [];
    
    if(this.convertingService.checkOnNotEmpty(housewifeStub).length !== 0)
      housewife_stub = await this.convertingService.findAllByCond(this.houseWifeStubRepository, housewifeStub);

    let glass_pocket_add: GlassPocketAddEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(glassPocketAdd).length !== 0)
      glass_pocket_add = await this.convertingService.findAllByCond(this.glassPocketAddRepository, glassPocketAdd);

    let window_lamination: WindowLaminationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(lamination).length !== 0)
      window_lamination = await this.convertingService.findAllByCond(this.laminationRepository, lamination);

    let window_profile: WindowProfileEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(profile).length !== 0)
      window_profile = await this.convertingService.findAllByCond(this.profileRepository, profile);
    
    let cameras_count: CamerasCountEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(camerasCount).length !== 0)
      cameras_count = await this.convertingService.findAllByCond(this.camerasCountRepository, camerasCount);
    
    let window_features: FeaturesEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(features).length !== 0)
      window_features = await this.convertingService.findAllByCond(this.featuresRepository, features);
    
    let sections_count: SectionCountEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(sectionCount).length !== 0)
      sections_count = await this.convertingService.findAllByCond(this.sectionCountRepository, sectionCount);
    

    const { images } = files;

    let imagesPathes: string[] = [];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    if(description.length > 5000)
      throw new HttpException('Не більше 5000 символів', HttpStatus.CONFLICT);

    const newProduct = this.windowRepository.create({
      name,
      product_producer,
      type_of_product,
      country,
      guarantee,
      in_stock: inStock,
      price,
      mosquito_net,
      window_sill,
      window_ebb,
      window_hand,
      child_lock,
      housewife_stub,
      glass_pocket_add,
      lamination: window_lamination,
      profile: window_profile,
      window_width: +windowWidth,
      window_height: +windowHeight,
      cameras_count,
      features: window_features,
      sections_count,
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
      inStock,
      price,
      productProducerName,
      typeOfProductName,
      mosquitoNet,
      windowSill,
      windowEbb,
      windowHand,
      childLock,
      housewifeStub,
      glassPocketAdd,
      lamination,
      profile,
      windowWidth,
      windowHeight,
      camerasCount,
      features,
      sectionCount,
      homePage,
      description,
    } = body;

    const type_of_product = await this.typeOfProductRepository.findOneBy({name: typeOfProductName});

    if(type_of_product == null){
      const typeOfProducts = await this.typeOfProductRepository.find();

      throw new HttpException(`Incorrect typeOfProrductName you could choose from: ${typeOfProducts
        .map((el: TypeOfProductEntity) => `'${el.name}'`)}`, HttpStatus.CONFLICT)
    }

    if(typeOfProductName !== TypeOfProductEnum.windows)
    throw new HttpException(`typeOfProductName must be 'Вікна'`, HttpStatus.CONFLICT);

    const typeOfProductRelations = {relations: {type_of_product: true}, where: {type_of_product}};

    const productProducers = await this.productProducerRepository.find(typeOfProductRelations);

    if(productProducers.length === 0) throw new HttpException(`Будь ласка створіть хоча б 1 виробника для ${TypeOfProductEnum.windows}`, HttpStatus.NOT_FOUND);

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


    let mosquito_net: MosquitNetEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(mosquitoNet).length !== 0)
      mosquito_net = await this.convertingService.findAllByCond(this.mosquitoNetRepository, mosquitoNet);

    let window_sill: WindowSillEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowSill).length !== 0)
      window_sill = await this.convertingService.findAllByCond(this.windowSillRepository, windowSill);

    let window_ebb: WindowEbbEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowEbb).length !== 0)
      window_ebb = await this.convertingService.findAllByCond(this.windowEbbRepository, windowEbb);

    let window_hand: WindowHandEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(windowHand).length !== 0)
      window_hand = await this.convertingService.findAllByCond(this.windowHandRepository, windowHand);

    let child_lock: ChildLockEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(childLock).length !== 0)
      child_lock = await this.convertingService.findAllByCond(this.childLockRepository, childLock);

    let housewife_stub: HousewifeStubEntity[] = [];
    
    if(this.convertingService.checkOnNotEmpty(housewifeStub).length !== 0)
      housewife_stub = await this.convertingService.findAllByCond(this.houseWifeStubRepository, housewifeStub);

    let glass_pocket_add: GlassPocketAddEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(glassPocketAdd).length !== 0)
      glass_pocket_add = await this.convertingService.findAllByCond(this.glassPocketAddRepository, glassPocketAdd);

    let window_lamination: WindowLaminationEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(lamination).length !== 0)
      window_lamination = await this.convertingService.findAllByCond(this.laminationRepository, lamination);

    let window_profile: WindowProfileEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(profile).length !== 0)
      window_profile = await this.convertingService.findAllByCond(this.profileRepository, profile);
    
    let cameras_count: CamerasCountEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(camerasCount).length !== 0)
      cameras_count = await this.convertingService.findAllByCond(this.camerasCountRepository, camerasCount);
    
    let window_features: FeaturesEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(features).length !== 0)
      window_features = await this.convertingService.findAllByCond(this.featuresRepository, features);
    
    let sections_count: SectionCountEntity[] = [];

    if(this.convertingService.checkOnNotEmpty(sectionCount).length !== 0)
      sections_count = await this.convertingService.findAllByCond(this.sectionCountRepository, sectionCount);

    const { images } = files;

    let imagesPathes: string[] = [...curProduct.images];
    
    if(images)
    imagesPathes = images.map((el) => el ? el.path : null);

    if(description.length > 5000)
      throw new HttpException('Не більше 5000 символів', HttpStatus.CONFLICT);

    curProduct.name = name;
    curProduct.product_producer = product_producer;
    curProduct.type_of_product = type_of_product;
    curProduct.guarantee = guarantee;
    curProduct.country = country;
    curProduct.in_stock = inStock;
    curProduct.price = +price;
    curProduct.mosquito_net = mosquito_net;
    curProduct.window_sill = window_sill;
    curProduct.window_ebb = window_ebb;
    curProduct.window_hand = window_hand;
    curProduct.child_lock = child_lock;
    curProduct.housewife_stub = housewife_stub;
    curProduct.glass_pocket_add = glass_pocket_add;
    curProduct.lamination = window_lamination;
    curProduct.profile = window_profile;
    curProduct.window_width = +windowWidth;
    curProduct.window_height = +windowHeight;
    curProduct.cameras_count = cameras_count;
    curProduct.features = window_features;
    curProduct.sections_count = sections_count;
    curProduct.home_page = homePage;
    curProduct.description = description;
    curProduct.images = imagesPathes;




    return await this.windowRepository.save(curProduct)  
  }

  async deleteById(id: number) {
    if ((await this.findById(id)) == null)
    throw new HttpException(`window with current id: ${id} doesn't exists`,
    HttpStatus.NOT_FOUND);

    return await this.windowRepository.delete(id)
    .then(() => `window by id: ${id} was deleted successfuly`);
  }

  async deleteAll(){
    const windowIds = await this.windowRepository.find()
    .then((data: WindowEntity[]) => 
      data.map((item: WindowEntity): number => 
        (item.id)
      )
    );

    if(windowIds.length !== 0)
    await this.windowRepository.delete(windowIds);

    return `items were deleted successfuly`
  }
}
