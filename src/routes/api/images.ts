import express from 'express';
const images = express.Router();
import Jimp from 'jimp';
import sizeOf from 'image-size';
import {promises as fsPromises} from 'fs';
import {access, constants} from 'fs';
import resizeImage from "../../utils/imageProcessing";
import path from "path";


images.get('/', (req: express.Request, res: express.Response) => {

    const url = req.url;
    const filename = req.query.filename;
    const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
    const originalPath = `./assets/full/${filename}.jpg`;
    const widthPath= req.query.width;
    const heightPath = req.query.height;
    let width:number = 0;
    let height:number = 0;
    const pathRoot = process.cwd();
    const imagePath = path.join(pathRoot,thumbPath);

        try {
            if(filename) {
                if (typeof (widthPath) === 'string') {
                    width = parseInt(widthPath);
                }
                if (typeof (heightPath) === 'string') {
                    height = parseInt(heightPath);
                }

                access(thumbPath, constants.F_OK, async(DoesNotExist)=>{
                    if(!DoesNotExist){
                        const image = sizeOf(thumbPath);

                        if((image.height === height) && (image.width === width)){
                            console.log("exists");
                            res.sendFile(imagePath);
                        }
                        else {
                            console.log("exists but different size");
                            await resizeImage(originalPath, thumbPath, width, height).then(()=>res.sendFile(imagePath));

                        }
                    }
                    else {
                        console.log(" do not exists");
                        await resizeImage(originalPath, thumbPath, width, height).then(()=>res.sendFile(imagePath));
                        //res.sendFile(imagePath);
                    }

                });


            }
        }
        catch (err){
            console.log(err)
        }













    //res.sendFile('path')


});


// const writeData = async () => {
//     try {
//         let newFile = await fsPromises.writeFile('file.txt', 'hello world');
//     } catch (err) {
//         console.log(err);
//     }
// }

//move new file

// const moveData = async () => {
//
//     try {
//         const moveImage = await fsPromises.rename('./assets/full/image.jpeg', './assets/thumb/newimage.jpeg');
//     }
//     catch (err){
//         console.log(err);
//     }
//
// }




export default images;