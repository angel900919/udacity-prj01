import express from 'express';
import path from 'path';
import { existsSync } from 'node:fs';
import { resizeImage, imageExist } from './resizeImage';

const processingImage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const filename: string =
    typeof req.query.filename === 'string' ? req.query.filename : '';
  const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
  const originalPath = `./assets/full/${filename}.jpg`;
  const widthFromPath: number =
    typeof req.query.width === 'string' ? parseInt(req.query.width) : 0;
  const heightFromPath: number =
    typeof req.query.height === 'string' ? parseInt(req.query.height) : 0;
  const imagePath = path.join(process.cwd(), thumbPath);

  try {
    if (filename && existsSync(originalPath)) {
      if (existsSync(thumbPath)) {

        if(!widthFromPath && !heightFromPath){
          throw new Error('Incorrect ImageSize or typo');
        }

        const imageFileExist = await imageExist(
          thumbPath,
          widthFromPath,
          heightFromPath
        );

        if (imageFileExist) {
          res.sendFile(imagePath);
        } else {
          await resizeImage(
            originalPath,
            widthFromPath,
            heightFromPath,
            thumbPath
          );
          res.sendFile(imagePath);
        }
      } else {

        if(!widthFromPath && !heightFromPath){
          throw new Error('Incorrect ImageSize or typo');
        }
        await resizeImage(
          originalPath,
          widthFromPath,
          heightFromPath,
          thumbPath
        );

        res.sendFile(imagePath);
      }
    } else {
      throw new Error('File does not exist')
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

export { processingImage };
