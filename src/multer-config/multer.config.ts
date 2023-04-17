import { diskStorage } from "multer";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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
