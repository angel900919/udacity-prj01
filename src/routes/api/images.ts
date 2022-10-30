import express from 'express';
const images = express.Router();
import sizeOf from 'image-size';
import { access, constants } from 'fs';
import { resizeImage } from '../../utils/imageProcessing';
import path from 'path';
import { existsSync } from 'node:fs';

images.get('/', (req: express.Request, res: express.Response) => {
  const filename: string =
    typeof req.query.filename === 'string' ? req.query.filename : '';
  const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
  const originalPath = `./assets/full/${filename}.jpg`;
  const width: number =
    typeof req.query.width === 'string' ? parseInt(req.query.width) : 0;
  const height: number =
    typeof req.query.height === 'string' ? parseInt(req.query.height) : 0;
  const imagePath = path.join(process.cwd(), thumbPath);

  try {
    if (filename && existsSync(originalPath)) {
      access(thumbPath, constants.F_OK, (DoesNotExist): void => {
        if (!DoesNotExist) {
          if (width && height) {
            const image = sizeOf(thumbPath);
            if (image.height === height && image.width === width) {
              res.sendFile(imagePath);
            } else {
              (async () => {
                await resizeImage(originalPath, thumbPath, width, height).then(
                  () => res.sendFile(imagePath)
                );
              })();
            }
          } else {
            res.status(404).send('width, height needs to be higher than 0 ');
          }
        } else {
          (async () => {
            await resizeImage(originalPath, thumbPath, width, height).then(() =>
              res.sendFile(imagePath)
            );
          })();
        }
      });
    } else {
      res.status(404).send('Incorrect File Name');
    }
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
});

export default images;
