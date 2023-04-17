import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntranceDoorEntity } from "../entrance-door/entrance-door.entity";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { Repository } from "typeorm";
import { InteriorDoorEntity } from "../interior-door/interior-door.entity";
import { WindowEntity } from "../window/window.entity";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { productMultiType } from "src/types/productMultiType";
import { IHoleFiltrationBody } from "../interfaces/IHoleFiltrationBody";
import { IPagination } from "../interfaces/IPagination";

@Injectable()
export class ProductsService {
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
    const relations = { relations: { product_producer: true } };

    return Promise.all([
      this.entranceDoorRepository.find(relations),
      this.furnitureRepository.find(relations),
      this.interiorDoorRepository.find(relations),
      this.windowRepository.find(relations),
    ]).then(products => products.flat());
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

  private async filtrationAlgorithm(checkboxArr: ProductProducerEntity[], sliderMinValue: number, sliderMaxValue: number, searchValue: string) {

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

  private async filtrationByCheckboxes(products: productMultiType[], checkboxArr: ProductProducerEntity[]) {

    const answer = [];
    for (const item of checkboxArr) {
      answer.push(products.filter((el: productMultiType) => el.product_producer.name === item.name));
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

  private async pagination(products: productMultiType[], pageNumber: number, itemsPerPage: number){
    return products.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
  }
}
