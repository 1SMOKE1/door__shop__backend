import { Injectable } from '@nestjs/common';
import { IProductProducer } from 'src/interfaces/IProductProducer';
import { CreateQueryBuilderService } from './create-query-builder.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntranceDoorEntity } from '../entrance-door/entrance-door.entity';
import { FurnitureEntity } from '../furniture/furniture.entity';
import { InteriorDoorEntity } from '../interior-door/interior-door.entity';
import { WindowEntity } from '../window/window.entity';

@Injectable()
export class FiltrationService {

  constructor(
    @InjectRepository(EntranceDoorEntity)
    private readonly entranceDoorRepository: Repository<EntranceDoorEntity>,
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    @InjectRepository(InteriorDoorEntity)
    private readonly interiorDoorRepository: Repository<InteriorDoorEntity>,
    @InjectRepository(WindowEntity)
    private readonly windowRepository: Repository<WindowEntity>,
    private readonly createQueryBuilderService: CreateQueryBuilderService
  ){}

  public async filtrationByCheckboxes(checkboxArr: IProductProducer[]) {
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};
    
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckBoxArr(this.interiorDoorRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArr(this.entranceDoorRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArr(this.furnitureRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArr(this.windowRepository, condition1, condition2),
    ]).then((products) => products.flat())
  }

  public async filtrationBySlider(sliderMinValue: number, sliderMaxValue: number){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderSlider(this.interiorDoorRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSlider(this.entranceDoorRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSlider(this.furnitureRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSlider(this.windowRepository, sliderMinValue, sliderMaxValue),
    ]).then((products) => products.flat())
  }

  public async filtrationBySearch(searchValue: string){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderSearch(this.interiorDoorRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearch(this.entranceDoorRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearch(this.furnitureRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearch(this.windowRepository, searchValue)
    ]).then((products) => products.flat())
  }

  public async filtrationByNoProductProducer(){  
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderNoProductProducers(this.interiorDoorRepository),
      this.createQueryBuilderService.createQueryBuilderNoProductProducers(this.entranceDoorRepository),
      this.createQueryBuilderService.createQueryBuilderNoProductProducers(this.furnitureRepository),
      this.createQueryBuilderService.createQueryBuilderNoProductProducers(this.windowRepository)
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckboxesAndSlider(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSlider(this.interiorDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSlider(this.entranceDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSlider(this.furnitureRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSlider(this.windowRepository, condition1, condition2, sliderMinValue, sliderMaxValue)
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckboxesAndSearchValue(checkboxArr: IProductProducer[], searchValue: string){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSearch(this.interiorDoorRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSearch(this.entranceDoorRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSearch(this.furnitureRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderForCheckBoxAndSearch(this.windowRepository, condition1, condition2, searchValue)
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckboxesAndNoProductProducers(checkboxArr: IProductProducer[]){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckBoxArrAndNoProductProducer(this.interiorDoorRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArrAndNoProductProducer(this.entranceDoorRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArrAndNoProductProducer(this.furnitureRepository, condition1, condition2),
      this.createQueryBuilderService.createQueryBuilderCheckBoxArrAndNoProductProducer(this.windowRepository, condition1, condition2),
    ]).then((products) => products.flat())
  }

  public async filtrationBySliderAndSearch(sliderMinValue: number, sliderMaxValue: number, searchValue: string){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderSliderAndSearch(this.interiorDoorRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndSearch(this.entranceDoorRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndSearch(this.furnitureRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndSearch(this.windowRepository, sliderMinValue, sliderMaxValue, searchValue),
    ]).then((products) => products.flat())
  }

  public async filtrationSliderAndNoProductProducers(sliderMinValue: number, sliderMaxValue: number){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderSliderAndNoProductProducer(this.interiorDoorRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndNoProductProducer(this.entranceDoorRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndNoProductProducer(this.furnitureRepository, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderSliderAndNoProductProducer(this.windowRepository, sliderMinValue, sliderMaxValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByNoProductProducersAndSearch(searchValue: string){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderSearchAndNoProductProducer(this.interiorDoorRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearchAndNoProductProducer(this.entranceDoorRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearchAndNoProductProducer(this.furnitureRepository, searchValue),
      this.createQueryBuilderService.createQueryBuilderSearchAndNoProductProducer(this.windowRepository, searchValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckboxesAndSliderAndSearch(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number, searchValue: string){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndSliderAndSearch(this.interiorDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndSliderAndSearch(this.entranceDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndSliderAndSearch(this.furnitureRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndSliderAndSearch(this.windowRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckboxesAndNoProductProducerAndSearch(checkboxArr: IProductProducer[],  searchValue: string){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndSearch(this.interiorDoorRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndSearch(this.entranceDoorRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndSearch(this.furnitureRepository, condition1, condition2, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndSearch(this.windowRepository, condition1, condition2, searchValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByNoProductProducerAndSearchAndSlider(sliderMinValue: number, sliderMaxValue: number, searchValue: string){
    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderNoProductProducerAndSearchAndSlider(this.interiorDoorRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderNoProductProducerAndSearchAndSlider(this.entranceDoorRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderNoProductProducerAndSearchAndSlider(this.furnitureRepository, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderNoProductProducerAndSearchAndSlider(this.windowRepository, sliderMinValue, sliderMaxValue, searchValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckBoxesAndNoProductProducerAndAndSlider(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndAndSlider(this.interiorDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndAndSlider(this.entranceDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndAndSlider(this.furnitureRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
      this.createQueryBuilderService.createQueryBuilderCheckboxesAndNoProductProducerAndAndSlider(this.windowRepository, condition1, condition2, sliderMinValue, sliderMaxValue),
    ]).then((products) => products.flat())
  }

  public async filtrationByCheckBoxesAndNoProductProucerAndSliderAndSearch(checkboxArr: IProductProducer[], sliderMinValue: number, sliderMaxValue: number, searchValue: string){
    const condition1 = {values: checkboxArr.map((el) => el.name)};
    const condition2 = {names: checkboxArr.map((el) => el.typeOfProduct.name)};

    return Promise.all([
      this.createQueryBuilderService.createQueryBuilderCheckBoxesAndNoProductProducerAndSliderAndSearch(this.interiorDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckBoxesAndNoProductProducerAndSliderAndSearch(this.entranceDoorRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckBoxesAndNoProductProducerAndSliderAndSearch(this.furnitureRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
      this.createQueryBuilderService.createQueryBuilderCheckBoxesAndNoProductProducerAndSliderAndSearch(this.windowRepository, condition1, condition2, sliderMinValue, sliderMaxValue, searchValue),
    ]).then((products) => products.flat())
  }


 


}
