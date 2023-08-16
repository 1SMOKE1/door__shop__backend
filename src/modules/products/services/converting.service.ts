import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FurnitureEntity } from '../furniture/furniture.entity';

@Injectable()
export class ConvertingService {

  public async findAllByCond(repository: Repository<any>, obj: string[]): Promise<FurnitureEntity[]>{
    return await Promise.all(
      obj.map(p =>  
        new Promise((res) => res(p))
          .then((el: string) => {
            return repository.findOneByOrFail({name: el})
          }
            ))
    )
  }

  public checkOnNotEmpty(val: string[]| null | undefined): string[]{
    if(val)
      switch(true){
        case val[0] === '':
          return [];
        case val[0] !== '':
          return [...val];
        case val[0] === 'null':
          return [];
        default: 
          return [];
      }
    return []
  }
}
