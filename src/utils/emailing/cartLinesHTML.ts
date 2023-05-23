import { ICartLine } from "src/modules/orders/interfaces/ICartLine";



const getCartLinesHTML = (arr: ICartLine[]): string => { 
  let txt = ''; 

  for(const item of arr){
    let cid = '';

    if(item.product.images.length !== 0){
      cid = item.product.choosenImage.split('\\').pop().split('.').shift();
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
        <div style="width: 25%;">
          <img src="cid:${cid}" 
          style="
          width:100px;
          height:100px;
          object-fit:contain;
          margin: 0 20px;
          " alt=""
          >
        </div>
        <div style="
          display: inline-block;
          width: 47%;
          vertical-align: top;
          ">
          <p style="
          font-weight: bold;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          text-decoration: underline;
          vertical-align: top;
          margin: 20px 0;
          text-align: center;
          ">${item.product.name}</p>
          <ul style="margin: 20px 0;">
            ${item.product.fabricMaterialWidth !== null? `<li>Ширина полотна: ${item.product.fabricMaterialWidth.name}</li>` : ''}
            ${item.product.doorFrameMaterial !== null? `<li>Короб: ${item.product.doorFrameMaterial.name}</li>` : ''}
            ${item.product.doorSelectionBoard !== null? `<li>Добірна дошка: ${item.product.doorSelectionBoard.name}</li>` : ''}
            ${item.product.doorWelt !== null? `<li>Лиштва: ${item.product.doorWelt.name}</li>` : ''}
            ${item.product.doorHand !== null? `<li>Дверна ручка: ${item.product.doorHand.name}</li>` : ''}
            ${item.product.doorMechanism !== null? `<li>Дверний механізм: ${item.product.doorMechanism.name}</li>` : ''}
            ${item.product.doorLoops !== null? `<li>Дверні петлі: ${item.product.doorLoops.name}</li>` : ''}
            ${item.product.doorStopper !== null? `<li>Дверний стопор: ${item.product.doorStopper.name}</li>` : ''}
            ${item.product.doorSlidingSystem !== null? `<li>Роздвижна система: ${item.product.doorSlidingSystem.name}</li>` : ''}

            ${item.product.mosquitoNet !== null? `<li>Москітна сітка: ${item.product.mosquitoNet.name}</li>` : ''}
            ${item.product.windowSill !== null? `<li>Підвіконня: ${item.product.windowSill.name}</li>` : ''}
            ${item.product.windowEbb !== null? `<li>Відлив: ${item.product.windowEbb.name}</li>` : ''}
            ${item.product.windowHand !== null? `<li>Ручка віконна: ${item.product.windowHand.name}</li>` : ''}
            ${item.product.childLock !== null? `<li>Дитячий замок: ${item.product.childLock.name}</li>` : ''}
            ${item.product.housewifeStub !== null? `<li>Заглушка домогосподарки: ${item.product.housewifeStub.name}</li>` : ''}
            ${item.product.glassPocketAdd !== null? `<li>Доповнення до стеклопакету: ${item.product.glassPocketAdd.name}</li>` : ''}
            ${item.product.lamination !== null? `<li>Ламінація: ${item.product.lamination.name}</li>` : ''}
            ${item.product.profile !== null? `<li>профіль: ${item.product.profile.name}</li>` : ''}
          </ul>
        </div>
        

        
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