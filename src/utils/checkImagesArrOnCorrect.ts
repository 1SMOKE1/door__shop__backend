import { HttpException, HttpStatus } from "@nestjs/common";

export class CheckImagesArrOnCorrect{

  protected checkImagesArrOnCorrect(arr: Express.Multer.File[]): void{
    const valid = !arr.every((file) => !file.originalname.includes('-'));

    if(valid)
      throw new HttpException('Incorrect images names, pls remove - from names', HttpStatus.CONFLICT);
  }
}