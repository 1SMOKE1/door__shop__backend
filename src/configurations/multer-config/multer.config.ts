import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|jfif|png|gif|svg|webp)$/)) {
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
    destination: './uploads/images',
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${file.originalname}`);
   },
})

export const ourWorkStorage = diskStorage({
  destination: './uploads/our-works',
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${file.originalname}`);
   },
})

export const ourCommentStorage = diskStorage({
  destination: './uploads/our-comments',
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${file.originalname}`);
   },
})

export const excelStorage = diskStorage({
  destination: './uploads/excel',
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${file.originalname}`);
   },
})


