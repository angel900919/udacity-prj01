"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images = express_1.default.Router();
const jimp_1 = __importDefault(require("jimp"));
//import {promises as fsPromises} from 'fs';
images.get('/', (req, res) => {
    const url = req.url;
    const filename = req.query.filename;
    const widthPath = req.query.width;
    const heightPath = req.query.height;
    let width = 0;
    let heigh = 0;
    if (filename) {
        if (widthPath === "string") {
            width = parseInt(widthPath);
        }
        if (heightPath === "string") {
            heigh = parseInt(heightPath);
        }
        jimp_1.default.read(`./full/${filename}.jpg`)
            .then(image => {
            console.log(image);
        })
            .catch(err => {
            console.log(err);
        });
    }
    console.log(filename, widthPath, heightPath);
    console.log("url:", url);
    res.send('Hello images!');
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
exports.default = images;
