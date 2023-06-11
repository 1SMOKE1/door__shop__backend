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
  destination(req, file, cb) {
    cb(null, `./uploads/images/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
})

export const ourWorkStorage = diskStorage({
  destination: `./uploads/our-works/`,
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
})

export const ourCommentStorage = diskStorage({
  destination: `./uploads/our-comments/`,
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
})

export const excelStorage = diskStorage({
  destination: `./uploads/excel/`,
    filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
   },
})


