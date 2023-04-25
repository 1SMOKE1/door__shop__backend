import { ISendMailOptions } from "@nestjs-modules/mailer"
import { ICartLineImage } from "src/interfaces/ICartLineImage"





const zamirFormMessage = (name: string, phone: string, address: string): ISendMailOptions => {

  const logo: ICartLineImage = {
    filename: 'logo.png',
    path: 'assets/logo.png',
    cid: 'logo'
  }

  return {
    from: 'Doorshop.dp.ua@gmail.com',
        to: 'kamyshan19@gmail.com', // chumak.dp.ua@gmail.com
        subject: `Замовлення на "безкоштовний замір" door_shop`,
        html: `
        <body style="margin: 0; background-color: #033579;">
        <div style="min-height: 80px; background-color: #778899;">
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
            padding-top: 81px;
            color: #fff;
            font-family: Arial,Helvetica, sans-serif;
            font-size: 32px;
            line-height: 45px;
            letter-spacing: 0.15em;
            font-weight: 900;
            "
            >
              ДАНІ КОРИСТУВАЧА
            </h1>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin: 40px 0;
            "
            >
              Ім'я: , <span style="text-decoration: underline;">${name}</span>
            </p>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin: 40px 0;
            "
            >
              Телефон: ${phone}
            </p>
            <p style="
            font-family: Arial,Helvetica, sans-serif;
            font-size: 24px;
            line-height: 27px;
            color: #fff;
            margin-bottom: 40px;
            "
            >
              Адресса: ${address}
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
      </body>
    `,
      attachments: [
        logo
      ]
    
  }
}

export default zamirFormMessage;