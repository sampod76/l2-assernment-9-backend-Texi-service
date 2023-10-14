/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Request, RequestHandler } from 'express';

import multer, { FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';
// import express from 'express';

//*******************note********* */
// create multer.d.ts

//*******************note********* */

//-------------single file upload----start------------
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    cb(null, path.join(__dirname, '../../uploadFile/images/'));
  },
  filename: (
    req,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => any
  ) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log(file);
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, jpeg, png formats are allowed!'));
  }
};

export const uploadSingleImage: RequestHandler = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB
  },
  fileFilter: fileFilter,
}).single('image');
//-------------single file upload----end------------
