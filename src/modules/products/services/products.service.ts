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
  ) {}

  async findAll() {
    return Promise.all([
      this.entranceDoorRepository.find(this.productRelations),
      this.furnitureRepository.find(this.productRelations),
      this.interiorDoorRepository.find(this.productRelations),
      this.windowRepository.find(this.productRelations),
    ]).then(products => products.flat());
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

    const { checkboxArr, sliderValue, searchValue } = body;

    const { sliderMinValue, sliderMaxValue } = sliderValue;

    const { page, itemsPerPage } = pagination;

    if (page && itemsPerPage) {
      return await this.filtrationAlgorithm(checkboxArr, sliderMinValue, sliderMaxValue, searchValue)
      .then((products: productMultiType[]) => 
      this.pagination(products, page, itemsPerPage));
    }

    return await this.filtrationAlgorithm(checkboxArr, sliderMinValue, sliderMaxValue, searchValue);
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

  private async filtrationAlgorithm(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number, searchValue: string) {

    const products = await this.findAll();

    // чекбоксы
    if (searchValue === "" && checkboxArr.length !== 0 &&  (sliderMinValue === 0 && sliderMaxValue === 20000)) {
      return await this.filtrationByCheckboxes(products, checkboxArr);
    }
    // слайдер
    if (searchValue === "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000)) {
      return await this.filtrationBySlider(products, sliderMinValue, sliderMaxValue);
    }
    // поиск
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000)) {
      return await this.filtrationBySearch(products, searchValue);
    }

    // для чекбоксов и слайдера
    if (searchValue === "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000)) {
      return await this.filtrationByCheckboxes(products, checkboxArr)
      .then((filteredProducts: productMultiType[]) => 
      this.filtrationBySlider(filteredProducts, sliderMinValue, sliderMaxValue));
    }

    // для чекбоксов и поиска
    if (searchValue !== "" && checkboxArr.length !== 0 && (sliderMinValue === 0 && sliderMaxValue === 20000)) {
      return await this.filtrationByCheckboxes(products, checkboxArr)
      .then((filteredProducts: productMultiType[]) => 
      this.filtrationBySearch(filteredProducts, searchValue));
    }

    // для слайдера и поиска
    if (searchValue !== "" && checkboxArr.length === 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000)) {
      return await this.filtrationBySlider(products, sliderMinValue, sliderMaxValue)
      .then((filteredProducts: productMultiType[]) => 
      this.filtrationBySearch(filteredProducts, searchValue));
    }

    // для чексоксов и слайдера и поиска
    if (searchValue !== "" && checkboxArr.length !== 0 && (sliderMinValue !== 0 || sliderMaxValue !== 20000)) {
      return await this.filtrationByCheckboxes(products, checkboxArr)
      .then((filteredProducts1: productMultiType[]) => 
      this.filtrationBySlider(filteredProducts1, sliderMinValue, sliderMaxValue))
      .then((filteredProducts2: productMultiType[]) => 
      this.filtrationBySearch(filteredProducts2, searchValue));
    }

    // Обнуление
    if (searchValue === "" && checkboxArr.length === 0 && (sliderMinValue === 0 && sliderMaxValue === 20000)) {
      return products;
    }
  }

  private async filtrationByCheckboxes(products: productMultiType[], checkboxArr: IProductProducer[]) {
    const answer = [];
    for (const item of checkboxArr) {
      answer.push(products.filter((el: productMultiType) => 
        el.product_producer != null ? 
          (el.product_producer.name === item.name && el.type_of_product.name === item.typeOfProduct.name)  
        : 
          false));
    }

    return answer.flat();
  }

  private async filtrationBySlider(products: productMultiType[], sliderMinValue: number, sliderMaxValue: number){
    return products
      .filter(el => el.price >= sliderMinValue && el.price <= sliderMaxValue)
      .sort((a, b) => a.price - b.price);
  }

  private async filtrationBySearch(products: productMultiType[], searchValue: string){
    if(!searchValue.trim){
      return products;
    }
    return products
      .filter((el: productMultiType) => 
      el.name.toLowerCase().includes(searchValue.toLowerCase()));
  }

  private async pagination(products: productMultiType[], pageNumber: number, itemsPerPage: number): Promise<IGetProducts>{

    const paginatedProducts = products.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

    return {products: paginatedProducts, productsLength: products.length};
  }

  
}
