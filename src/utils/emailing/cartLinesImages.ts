import { ICartLineImage } from "src/interfaces/ICartLineImage";
import { ICartLine } from "src/modules/orders/interfaces/ICartLine";



const getCartLinesImages = (arr: ICartLine[]): ICartLineImage[] => {

  return arr.map((el: ICartLine) => {
      let filename = '';
      if(el.product.images.length !== 0){
        filename = el.product.images[0].split('\\').pop();
      }
      const cid = filename.split('.').shift();
      return {
        filename,
        path: el.product.images.length !== 0 ? el.product.images[0] : '',
        cid
      }
    }
  )
}

export default getCartLinesImages;