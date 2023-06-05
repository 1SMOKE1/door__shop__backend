import { ISendMailOptions } from "@nestjs-modules/mailer";
import { ICartLineImage } from "src/interfaces/ICartLineImage";
import { ICartLine } from "src/modules/orders/interfaces/ICartLine";
import getCartLinesHTML from "./cartLinesHTML";
import getCartLinesImages from "./cartLinesImages";

const ownerMessage = (name: string, email: string, totalCost: number, phone: string, address: string, kindOfPayment: string, cartLines: ICartLine[] & JSON): ISendMailOptions => {
  const logo: ICartLineImage = {
    filename: "logo.png",
    path: "assets/logo.png",
    cid: "logo",
  };

  // <div style="display: flex; width: 140px; justify-content: space-between; align-items: center;">
  //   <a href="" target="_blank">
  //     <img src="assets/inst.png" alt="" /></a>
  //   <a href="" target="_blank">
  //     <img src="assets/fb.png" alt="" /></a>
  //   <a href="" target="_blank">
  //     <img src="assets/youtube.png" alt="" /></a>
  // </div>

  return {
    from: "Doorshop.dp.ua@gmail.com",
    to: "chumak.dp.ua@gmail.com", // "kamyshan19@gmail.com", 
    subject: `Замовлення З door_shop`,
    html: `
        <body style="margin: 0;">
        <div style="background-color: #033579;">
        <div style="min-height: 80px; background-color: ##778899;">
          <div
            style="
              max-width: 1346px;
              padding: 0 15px;
              margin: 0 auto;
              box-sizing: border-box;
            "
          >
          <div style="padding: 20px 0;">
            <a style="display: block; width: 125px;" href="https://yakdveri.com.ua" target="_blank">
              <img style="width: 100%;" src="cid:${logo.cid}" alt="" />
            </a>
          </div>
            
          </div>
        </div>
  
        <div style="background-color: #033579; min-height: 475px; text-align: center; font-weight: 400;">
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
            letter-spacing: 0.2em;
            font-weight: 900;
            "
            >
              Ім'я замовника: ${name}
            </h1>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin: 20px 0;
            "
            >
              Адресса замовника: ${address}
            </p>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin: 20px 0;
            "
            >
              Email: ${email}
            </p>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin-bottom: 40px;
            "
            >
              Телефон замовника: ${phone}
            </p>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin-bottom: 40px;
            "
            >
              Тип оплати замовлення: ${kindOfPayment}
            </p>
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
            Замовлення
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
    attachments: [...getCartLinesImages(cartLines), logo],
  };
};

export default ownerMessage;
