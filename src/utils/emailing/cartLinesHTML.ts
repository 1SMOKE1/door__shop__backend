import { ICartLine } from "src/modules/orders/interfaces/ICartLine";



const getCartLinesHTML = (arr: ICartLine[]): string => { 
  let txt = ''; 

  for(const item of arr){
    let cid = '';

    if(item.product.images.length !== 0){
      cid = item.product.images[0].split('\\').pop().split('.').shift();
    }
    

    txt +=
      `
      <div style="display: inline;
      font-weight: 400;
      font-family: Arial,Helvetica, sans-serif;
      font-size: 16px;
      line-height: 18px;"
      >
      <div style=" 
      margin: 30px auto 0;
      padding: 0 15px;
      ">
        <img src="cid:${cid}" 
        style="
        width:100px;
        height:100px;
        object-fit:contain;
        margin: 0 20px;" alt="">
        <p style="
          font-weight: inherit;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          display: inline; 
          vertical-align: top;
          margin: 0 12%;
        ">${item.product.name}</p>
        <div style="
          display: inline-block;
          vertical-align: top; 
          margin: 0 12%;
          ">
          <p style="
            text-decoration: underline; 
            font-weight: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          ">Кількість</p>
          <p style="
            text-align: center;
            font-weight: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          ">${item.quantity}</p>
        </div>
        <div style="background-color: #D9D9D9; 
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: 500;
        padding: 3px 10px;
        display: inline; 
        vertical-align: bottom;
        margin-bottom: 20px;
        ">
          ${item.product.price}.00 грн
        </div>
      </div>
    </div>
    <hr size="0.5px" width="100%" color="#999999">
    `;
  }

  return txt; 
}

export default getCartLinesHTML;