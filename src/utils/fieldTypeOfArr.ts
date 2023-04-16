import { HttpException, HttpStatus } from "@nestjs/common";


const fieldTypeOfArr = async (item: any) => {

  if(typeof item != 'object'){
    throw new HttpException(`${item} isn't typeof array`, HttpStatus.CONFLICT);
  }

}

export default fieldTypeOfArr