import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function CustomFileInterceptor(
  fieldName: string,
  options: MulterOptions = {},
): Type<NestInterceptor> {
  @Injectable()
  class FileInterceptorMixin implements NestInterceptor {
    constructor() {}

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: './uploads/profiles', // Carpeta temporal de subida
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 1024 * 1024 * 2, // 2MB
        },
        ...options,
      };

      const fileInterceptor = new (FileInterceptor(fieldName, multerOptions))();
      return fileInterceptor.intercept(...args);
    }
  }

  return mixin(FileInterceptorMixin);
}
