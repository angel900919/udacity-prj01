import express from 'express';
import images from "./api/images";
const routes = express.Router();
import path from "path";


routes.get('/', (req: express.Request, res: express.Response) => {



    res.send('Hello main')


});

routes.use('/images', images);

export default routes;