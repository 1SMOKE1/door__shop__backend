import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntranceDoorEntity } from "../entrance-door/entrance-door.entity";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { Repository } from "typeorm";
import { InteriorDoorEntity } from "../interior-door/interior-door.entity";
import { WindowEntity } from "../window/window.entity";
import { productMultiType } from "src/types/productMultiType";
import { IHoleFiltrationBody } from "../interfaces/IHoleFiltrationBody";
import { IPagination } from "../interfaces/IPagination";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { IProductProducer } from "src/interfaces/IProductProducer";
import { IGetProducts } from "src/interfaces/IGetProducts";
import { FiltrationService } from "./filtration.service";


@Injectable()
export class ProductsService {

  private productRelations = { relations: { product_producer: true, type_of_product: true } };

  constructor(
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(InteriorDoorEntity)
    private readonly interiorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(WindowEntity)
    private readonly windowRepository: Repository<WindowEntity>,
    private readonly filtrationService: FiltrationService
  ) {}

  async findAll() {
    return await Promise.all([
      this.entranceDoorRepository.find(this.productRelations),
      this.furnitureRepository.find(this.productRelations),
      this.interiorDoorRepository.find(this.productRelations),
      this.windowRepository.find(this.productRelations),
    ]).then(products => products.flat());
  }

  async findAllAndPagination(pagination: IPagination){
    const {page, itemsPerPage} = pagination;
    return this.findAll().then((products: productMultiType[]) => 
    this.pagination(products, page, itemsPerPage));
  }

  async findOne(id: number, typeOfProductName: string){

    const relations = {where: {id} ,...this.productRelations}

    switch(true){
      case typeOfProductName === TypeOfProductEnum.entranceDoor:
        return await this.entranceDoorRepository.findOne(relations);
      case typeOfProductName === TypeOfProductEnum.interiorDoor:
        return await this.interiorDoorRepository.findOne(relations);
      case typeOfProductName === TypeOfProductEnum.furniture:
        return await this.furnitureRepository.findOne(relations);
      case typeOfProductName === TypeOfProductEnum.windows:
        return await this.windowRepository.findOne(relations);
    }
  }

  async filtration(body: IHoleFiltrationBody, pagination: IPagination) {

    const { checkboxArr, sliderValue, searchValue, noProductProducers} = body;

    const { sliderMinValue, sliderMaxValue } = sliderValue;

    const { page, itemsPerPage } = pagination;


    return this.filtrationAlgorithm(checkboxArr, sliderMinValue, sliderMaxValue, searchValue, noProductProducers)
    .then((products: productMultiType[]) => 
    this.pagination(products, page, itemsPerPage));
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

    const interiorDoorIds = await this.interiorDoorRepository.find()
    .then((data: InteriorDoorEntity[]) => 
      data.map((item: InteriorDoorEntity): number => 
        (item.id)
      )
    );

    if(interiorDoorIds.length !== 0)
    await this.interiorDoorRepository.delete(interiorDoorIds);

    const funitureIds = await this.furnitureRepository.find()
    .then((data: FurnitureEntity[]) => 
      data.map((item: FurnitureEntity): number => 
        (item.id)
      )
    );

    if(funitureIds.length !== 0)
    await this.furnitureRepository.delete(funitureIds);

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

  private async filtrationAlgorithm(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number, searchValue: string, noProductProducers: boolean) {

    // чекбоксы
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationByCheckboxes(checkboxArr);
    }
    // слайдер
    if (searchValue === "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationBySlider(sliderMinValue, sliderMaxValue);
    }
    // поиск
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === false) {
      console.log(await this.filtrationService.filtrationBySearch(searchValue));
      return await this.filtrationService.filtrationBySearch(searchValue);
    }

    // без производителя
    if(searchValue === "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === true){
      return await this.filtrationService.filtrationByNoProductProducer();
    }

    // для чекбоксов и слайдера
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationByCheckboxesAndSlider(checkboxArr, sliderMinValue, sliderMaxValue);
    }

    // для чекбоксов и поиска
    if (searchValue !== "" && checkboxArr.length !== 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationByCheckboxesAndSearchValue(checkboxArr, searchValue);
    }

    // для чекбоксов и без производителя
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByCheckboxesAndNoProductProducers(checkboxArr);
    }

    // для слайдера и поиска
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationBySliderAndSearch(sliderMinValue, sliderMaxValue, searchValue);
    }

    // для слайдера и без производителя
    if (searchValue === "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationSliderAndNoProductProducers(sliderMinValue, sliderMaxValue);
    }

    // для поиска и без производителя
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByNoProductProducersAndSearch(searchValue);
    }

    // для чекбоксов и слайдера и поиска
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === false) {
      return await this.filtrationService.filtrationByCheckboxesAndSliderAndSearch(checkboxArr, sliderMinValue, sliderMaxValue, searchValue);
    }

    // для чекбоксов и поиска и без производителя
    if (searchValue !== "" && checkboxArr.length !== 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByCheckboxesAndNoProductProducerAndSearch(checkboxArr, searchValue);
    }

    // для слайдера и поиска и без производителя
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByNoProductProducerAndSearchAndSlider(sliderMinValue, sliderMaxValue, searchValue);
    }


    // для чекбоксов и слайдера и без производителя
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByCheckBoxesAndNoProductProducerAndAndSlider(checkboxArr, sliderMinValue, sliderMaxValue);
    }

    // для чекбоксов и слайдера и поиска и без производителя
    if (searchValue !== "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000) && noProductProducers === true) {
      return await this.filtrationService.filtrationByCheckBoxesAndNoProductProucerAndSliderAndSearch(checkboxArr, sliderMinValue, sliderMaxValue, searchValue);
    }

    // Обнуление
    // if (searchValue === "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000) && noProductProducers === false) {
    //   return await this.findAll();
    // }
  }

  private async pagination(products: productMultiType[], pageNumber: number, itemsPerPage: number): Promise<IGetProducts>{

    const paginatedProducts = products.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

    return {products: paginatedProducts, productsLength: products.length};
  }

  

  
}
