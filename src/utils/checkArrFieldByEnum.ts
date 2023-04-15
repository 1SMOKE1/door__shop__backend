import { HttpException, HttpStatus } from "@nestjs/common";
import checkEnum from "./checkEnum";
import generateErrorArr from "./generateErrorArr";

const checkArrFieldByEnum = async <T>(obj: T, items: string[], fieldName: string) => {
  for await (const item of items) {
    if (!(await checkEnum(obj, item))) {
      const itemsToChoose = await generateErrorArr(obj);

      throw new HttpException(`Incorrect ${fieldName} you could choose from: ${itemsToChoose.map((el: string) => `'${el}'`)}`, HttpStatus.CONFLICT);
    }
  }
};

export default checkArrFieldByEnum;
