import { ICartLineImage } from "src/interfaces/ICartLineImage";
import { ICartLine } from "src/modules/orders/interfaces/ICartLine";



const getCartLinesImages = (arr: ICartLine[]): ICartLineImage[] => {
  return arr.map((el: ICartLine) => {
      const filename = el.product.img_main.split('\\').pop();
      const cid = filename.split('.').shift();
      return {
        filename,
        path: el.product.img_main,
        cid
      }
    }
  )
}

export default getCartLinesImages;