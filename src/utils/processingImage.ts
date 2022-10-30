import express from 'express';
import path from 'path';
import { existsSync } from 'node:fs';
import sharp from 'sharp';

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

      const imageOriginal = sharp(originalPath);

      if (existsSync(thumbPath)) {
        const image = sharp(thumbPath);
        const metadata = await image.metadata();

        if ( widthFromPath === metadata.width && metadata.height === heightFromPath) {

          res.sendFile(imagePath);

        } else {

          await imageOriginal
            .resize({ width: widthFromPath, height: heightFromPath })
            .toFile(thumbPath)
          res.sendFile(imagePath);
        }
      } else {
        await imageOriginal
            .resize({ width: widthFromPath, height: heightFromPath })
            .toFile(thumbPath)
        res.sendFile(imagePath);
      }
    } else {
      res.send('Incorrect File Name');
    }
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
};

export { processingImage };
