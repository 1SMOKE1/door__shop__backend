import { HttpException, HttpStatus } from "@nestjs/common";
import * as moment from "moment";
import { diskStorage } from "multer";

const date = moment().format('DDMMYYYY-HHmmsss_SSS');

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|jfif|png|svg|webp)$/)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.FORBIDDEN), false);
  }
  callback(null, true);
};

export const excelFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.FORBIDDEN), false);
  }

  callback(null, true);
}

export const imageStorage = diskStorage({
    destination: function (req, file, cb) {
      cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), './uploads/images')
    },
    filename: (req: any, file: any, cb) => {
      cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), `${date}-${file.originalname}`);
   },
})

export const ourWorkStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), './uploads/our-works')
  },
    filename: (req: any, file: any, cb) => {
      cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), `${date}-${file.originalname}`);
   },
})

export const ourCommentStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), './uploads/our-comments')
  },
  filename: (req: any, file: any, cb) => {
    cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), `${date}-${file.originalname}`);
  },
})

export const excelStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), './uploads/excel')
  },
    filename: (req: any, file: any, cb) => {
      cb(new HttpException('something went wrong', HttpStatus.FORBIDDEN), `${date}-${file.originalname}`);
   },
})


