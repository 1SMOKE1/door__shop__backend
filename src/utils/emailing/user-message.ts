import { ISendMailOptions } from "@nestjs-modules/mailer";
import getCartLinesImages from "./cartLinesImages";
import { ICartLine } from "src/modules/orders/interfaces/ICartLine";
import getCartLinesHTML from "./cartLinesHTML";
import { ICartLineImage } from "src/interfaces/ICartLineImage";



const userMessage = (name: string, email: string, totalCost: number, phone: string, cartLines: ICartLine[] & JSON): ISendMailOptions => {


  const logo: ICartLineImage = {
    filename: 'logo.png',
    path: 'assets/logo.png',
    cid: 'logo'
  }


  // <div style="display: flex; width: 140px; justify-content: space-between; align-items: center;">
  //   <a href="" target="_blank">
  //     <img src="assets/inst.png" alt="" /></a>
  //   <a href="" target="_blank">
  //     <img src="assets/fb.png" alt="" /></a>
  //   <a href="" target="_blank">
  //     <img src="assets/youtube.png" alt="" /></a>
  // </div>


  return {
        from: 'Doorshop.dp.ua@gmail.com',
        to: email, // chumak.dp.ua@gmail.com
        subject: `Замовлення З door_shop`,
        html: `
        <body style="margin: 0;">

        <div style="min-height: 80px; background-color: #033579;">
        <div
          style="
            max-width: 1346px;
            padding: 0 15px;
            margin: 0 auto;
            box-sizing: border-box;
          "
        >
        <div style="padding: 20px 0; display: flex; justify-content: space-between; align-items: center;">
          <a style="display: block; width: 125px;" href="https://yakdveri.com.ua" target="_blank">
            <img style="width: 100%;" src="cid:${logo.cid}" alt="" />
          </a>
        </div>
          
        </div>
    


      <div style="background-color: #033579; min-height: 675px; text-align: center; font-weight: 400;">
        <div
          style="
            max-width: 1346px;
            padding: 0 15px;
            margin: 0 auto;
            box-sizing: border-box;
            position: relative;
            z-index: 100;
          "
        >
          <h1 style="
          color: #fff;
          font-family: Arial,Helvetica, sans-serif;
          font-size: 32px;
          line-height: 45px;
          letter-spacing: 0.15em;
          font-weight: 900;
          "
          >
            ЩИРО ВДЯЧНІ ЗА ЗАМВОЛЕННЯ!
          </h1>
          <p style="
          font-family: Arial,Helvetica, sans-serif;
          font-size: 24px;
          line-height: 27px;
          color: #fff;
          margin: 40px 0;
          "
          >
            Шановний, <span style="text-decoration: underline;">${name}</span>
          </p>
          <p style="
          font-family: Arial,Helvetica, sans-serif;
          font-size: 24px;
          line-height: 27px;
          color: #fff;
          margin: 40px 0;
          "
          >
            Ви залишили цей телефон ${phone} для зв’язку
          </p>
          <p style="
          font-family: Arial,Helvetica, sans-serif;
          font-size: 24px;
          line-height: 27px;
          color: #fff;
          margin-bottom: 40px;
          "
          >
            Наш менеджер зв’яжеться з Вами найближчим часом
          </p>
          <a 
          style="
            width: 170px;
            display: block;
            margin: 50px auto 200px;
            padding: 20px 63px;
            font-family: Arial,Helvetica, sans-serif;
            font-size: 20px;
            line-height: 23px;
            color: #033579;
            background-color: #fffeb8;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color .3s ease;
            text-decoration: none;
            "
          href="https://yakdveri.com.ua"
          target="_blank"
            >
            Повернутися на сайт
          </a>
          <img src="assets/bg_main_left.png" style=" left: 0; top: 140%; position: absolute; display: block; z-index: 1; transform: translate(0, -140%);" alt="">
          <img src="assets/bg_main_right.png" style=" right: 0; top: 140%; position: absolute; display: block; z-index: 1; transform: translate(0, -140%);" alt="">
        </div>
      </div>
        </div>
        
        <div style="
          max-width: 960px;
          padding: 0 15px;
          margin: 0 auto;
          box-sizing: border-box;
        ">
          <h2 style="
          font-weight: 400;
          font-family: Arial,Helvetica, sans-serif;
          font-size: 24px;
          line-height: 27px;
          margin: 32px 0 14px 0;
          color: #033579;
          "
          >
            Ваше замовлення
          </h2>
          <hr size="0.5px" width="100%" color="#999999">
          ${getCartLinesHTML(cartLines)}
          <div style="margin: 30px 0 35px 0; min-height: 100px; display: inline-block; text-align: end; width: 100%;">
            <div style="display: inline; vertical-align: middle">
              <p style="
                font-weight: 400;
                font-family: Arial,Helvetica, sans-serif;
                font-size: 14px;
                line-height: 16.1px;
                display: inline;
                ">СУМА:
              </p>
              <div style="background-color: #D9D9D9; margin: 0 50px 0 10px; display: inline-block;">
                <p style="
                  font-weight: 400;
                  font-family: Arial,Helvetica, sans-serif;
                  font-size: 20px;
                  line-height: 23px;
                  margin: 0;
                  padding: 8px 20px;
                  ">${totalCost}.00 грн</p>
              </div>
          </div>
        </div>  
      </body>
    `,
        attachments: [
          ...getCartLinesImages(cartLines),
          logo
        ]
    }
}

export default userMessage;