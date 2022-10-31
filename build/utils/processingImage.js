"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processingImage = void 0;
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
const resizeImage_1 = require("./resizeImage");
const onlyNumbersCheck_1 = __importDefault(require("./onlyNumbersCheck"));
const processingImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = typeof req.query.filename === 'string' ? req.query.filename : '';
    const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
    const originalPath = `./assets/full/${filename}.jpg`;
    const widthFromPath = req.query.width;
    const heightFromPath = req.query.height;
    const imagePath = path_1.default.join(process.cwd(), thumbPath);
    const width_height = typeof widthFromPath === 'string' && typeof heightFromPath === 'string';
    let width = 0;
    let height = 0;
    try {
        //error handling
        if (!filename) {
            throw new Error('Incorrect file Name');
        }
        if (!(0, node_fs_1.existsSync)(originalPath)) {
            throw new Error('file does not exits');
        }
        if (!widthFromPath || !heightFromPath || !width_height) {
            throw new Error('Missing Width/height');
        }
        if (typeof widthFromPath === 'string') {
            if (!(0, onlyNumbersCheck_1.default)(widthFromPath)) {
                //res.send('width can only contain integers');
                throw new Error('width can only contain integers');
            }
        }
        if (typeof heightFromPath === 'string') {
            if (!(0, onlyNumbersCheck_1.default)(heightFromPath)) {
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
        if ((0, node_fs_1.existsSync)(thumbPath)) {
            const imageFileExist = yield (0, resizeImage_1.imageExist)(thumbPath, width, height);
            if (imageFileExist) {
                res.sendFile(imagePath);
            }
            else {
                yield (0, resizeImage_1.resizeImage)(originalPath, width, height, thumbPath);
                res.sendFile(imagePath);
            }
        }
        else {
            yield (0, resizeImage_1.resizeImage)(originalPath, width, height, thumbPath);
            res.sendFile(imagePath);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.send(err.message);
            console.log(err.message);
        }
    }
});
exports.processingImage = processingImage;
