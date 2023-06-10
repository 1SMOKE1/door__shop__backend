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
    cb(null, `uploads/images`);
  },
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
})

export const ourWorkStorage = diskStorage({
  destination: function (req, file, cb) {
    try{
      cb(null, `uploads/our-works`);
    } catch (err) {
      throw new HttpException('something went wrong with folder uploads/our-works', HttpStatus.FORBIDDEN);
    }
  },
  filename: (req, file, cb) => {
    try{
      cb(null, `${date}-${file.originalname}`);
      // new HttpException('something went wrong with name', HttpStatus.FORBIDDEN)
    } catch(err) {
      throw new HttpException('something went wrong with name', HttpStatus.FORBIDDEN);
    }
  },
})

export const ourCommentStorage = diskStorage({
  destination: function (req, file, cb) {
    try{
      cb(null, `uploads/our-comments`);
    } catch (err) {
      throw new HttpException('something went wrong with folder uploads/our-comments', HttpStatus.FORBIDDEN);
    }
  },
  filename: (req, file, cb) => {
    try{
      cb(null, `${date}-${file.originalname}`);
      // new HttpException('something went wrong with name', HttpStatus.FORBIDDEN)
    } catch(err) {
      throw new HttpException('something went wrong with name', HttpStatus.FORBIDDEN);
    }
  },
})

export const excelStorage = diskStorage({
  destination: function (req, file, cb) {
    try{
      cb(null, `uploads/excel`);
    } catch (err) {
      throw new HttpException('something went wrong with folder uploads/excel', HttpStatus.FORBIDDEN);
    }
  },
    filename: (req, file, cb) => {
      try{
        cb(null, `${date}-${file.originalname}`);
        // new HttpException('something went wrong with name', HttpStatus.FORBIDDEN)
      } catch(err) {
        throw new HttpException('something went wrong with name', HttpStatus.FORBIDDEN);
      }
   },
})


