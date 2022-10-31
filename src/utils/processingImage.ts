import express from 'express';
import path from 'path';
import { existsSync } from 'node:fs';
import { resizeImage, imageExist } from './resizeImage';
import containsOnlyNumbers from './onlyNumbersCheck';

const processingImage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const filename: string =
    typeof req.query.filename === 'string' ? req.query.filename : '';

  const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
  const originalPath = `./assets/full/${filename}.jpg`;
  const widthFromPath = req.query.width;
  const heightFromPath = req.query.height;
  const imagePath = path.join(process.cwd(), thumbPath);
  const width_height: boolean =
    typeof widthFromPath === 'string' && typeof heightFromPath === 'string';
  let width = 0;
  let height = 0;

  try {
    //error handling
    if (!filename) {
      throw new Error('Incorrect file Name');
    }
    if (!existsSync(originalPath)) {
      throw new Error('file does not exits');
    }
    if (!widthFromPath || !heightFromPath || !width_height) {
      throw new Error('Missing Width/height');
    }
    if (typeof widthFromPath === 'string') {
      if (!containsOnlyNumbers(widthFromPath)) {
        //res.send('width can only contain integers');
        throw new Error('width can only contain integers');
      }
    }
    if (typeof heightFromPath === 'string') {
      if (!containsOnlyNumbers(heightFromPath)) {
        // res.send('height can only contain integers');
        throw new Error('height can only contain integers');
      }
    }

    //functionality start here

    if (typeof widthFromPath === 'string') {
      width = parseInt(widthFromPath);
    }
    if (typeof heightFromPath === 'string') {
      height = parseInt(heightFromPath);
    }

    if (existsSync(thumbPath)) {
      const imageFileExist = await imageExist(thumbPath, width, height);

      if (imageFileExist) {
        res.sendFile(imagePath);
      } else {
        await resizeImage(originalPath, width, height, thumbPath);
        res.sendFile(imagePath);
      }
    } else {
      await resizeImage(originalPath, width, height, thumbPath);

      res.sendFile(imagePath);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.send(err.message);
      console.log(err.message);
    }
  }
};

export { processingImage };
