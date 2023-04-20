import { diskStorage } from "multer";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

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
