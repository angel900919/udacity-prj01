import express from 'express';
const images = express.Router();
import { processingImage } from '../../utils/processingImage';

images.get('/', processingImage, (req: express.Request, res: express.Response) => {
  res.send('ok');
});

export default images;
