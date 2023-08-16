import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TAllProductRepositories } from '../interfaces/TAllProductRepositories';

@Injectable()
export class CreateQueryBuilderService {

  private productRelations = { relations: { product_producer: true, type_of_product: true } };

  public createQueryBuilderCheckBoxArr(repository: Repository<any>, condition1: any, condition2: any): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .getMany();
  }

  public createQueryBuilderSlider(repository: Repository<any>, sliderMinValue: number, sliderMaxValue: number): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany()
  }

  public createQueryBuilderSearch(repository: Repository<any>, searchValue: string): Promise<TAllProductRepositories>{
    if(!searchValue.trim)
      return repository.find(this.productRelations)
    else 
      return repository
        .createQueryBuilder('table')
        .leftJoinAndSelect('table.product_producer', 'product_producer')
        .leftJoinAndSelect('table.type_of_product', 'type_of_product')
        .where('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
        .getMany()
  }

  public async createQueryBuilderNoProductProducers(repository: Repository<any>): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
    .leftJoinAndSelect('table.product_producer', 'product_producer')
    .leftJoinAndSelect('table.type_of_product', 'type_of_product')
    .where('table.product_producer IS NULL')
    .getMany()
  }

  public createQueryBuilderForCheckBoxAndSlider(repository: Repository<any>, condition1: any, condition2: any, sliderMinValue: number, sliderMaxValue: number, ): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany()
  }

  public createQueryBuilderForCheckBoxAndSearch(repository: Repository<any>, condition1: any, condition2: any, searchValue: string ): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('table.name = :value', {value: searchValue})
      .getMany()
  }

  public createQueryBuilderCheckBoxArrAndNoProductProducer(repository: Repository<any>, condition1: any, condition2: any): Promise<TAllProductRepositories>{

    const queryWithProductProducer = repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .getMany();

    const queryWithoutProductProducer =  repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('table.product_producer IS NULL')
      .getMany();

    return Promise.all([queryWithProductProducer, queryWithoutProductProducer])
    .then(([recordsWithProductProducer, recordsWithoutProductProducer]) => [
      ...recordsWithProductProducer,
      ...recordsWithoutProductProducer,
    ]);
  }

  public createQueryBuilderSliderAndSearch(repository: Repository<any>, sliderMinValue: number, sliderMaxValue: number, searchValue: string): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  public createQueryBuilderSliderAndNoProductProducer(repository: Repository<any>, sliderMinValue: number, sliderMaxValue: number): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('table.product_producer IS NULL')
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  public createQueryBuilderSearchAndNoProductProducer(repository: Repository<any>, searchValue: string): Promise<TAllProductRepositories>{
    return repository
      .createQueryBuilder('table')
        .leftJoinAndSelect('table.product_producer', 'product_producer')
        .leftJoinAndSelect('table.type_of_product', 'type_of_product')
        .where('table.product_producer IS NULL')
        .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
        .getMany();
  }

  public createQueryBuilderCheckboxesAndSliderAndSearch(repository: Repository<any>, condition1: any, condition2: any, sliderMinValue: number, sliderMaxValue: number, searchValue: string): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  public createQueryBuilderCheckboxesAndNoProductProducerAndSearch(repository: Repository<any>, condition1: any, condition2: any, searchValue: string): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('table.product_producer IS NULL')
      .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
      .getMany();
  }

  public createQueryBuilderNoProductProducerAndSearchAndSlider(repository: Repository<any>, sliderMinValue: any, sliderMaxValue: any, searchValue: string): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('table.product_producer IS NULL')
      .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  public createQueryBuilderCheckboxesAndNoProductProducerAndAndSlider(repository: Repository<any>, condition1: any, condition2: any, sliderMinValue: any, sliderMaxValue: any): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('table.product_producer IS NULL')
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  public createQueryBuilderCheckBoxesAndNoProductProducerAndSliderAndSearch(repository: Repository<any>, condition1: any, condition2: any, sliderMinValue: any, sliderMaxValue: any, searchValue: string): Promise<TAllProductRepositories>{
    return repository
    .createQueryBuilder('table')
      .leftJoinAndSelect('table.product_producer', 'product_producer')
      .leftJoinAndSelect('table.type_of_product', 'type_of_product')
      .where('product_producer.name IN (:...values)', condition1)
      .andWhere('type_of_product.name IN (:...names)', condition2)
      .andWhere('table.product_producer IS NULL')
      .andWhere('POSITION(:searchValue IN LOWER(table.name)) > 0', {searchValue: searchValue.toLowerCase()})
      .andWhere('table.price >= :minValue', {minValue: sliderMinValue})
      .andWhere('table.price <= :maxValue', {maxValue: sliderMaxValue})
      .orderBy('table.price', 'ASC')
      .getMany();
  }

  
  
}
