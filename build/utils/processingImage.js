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
const processingImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = typeof req.query.filename === 'string' ? req.query.filename : '';
    const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
    const originalPath = `./assets/full/${filename}.jpg`;
    const widthFromPath = typeof req.query.width === 'string' ? parseInt(req.query.width) : 0;
    const heightFromPath = typeof req.query.height === 'string' ? parseInt(req.query.height) : 0;
    const imagePath = path_1.default.join(process.cwd(), thumbPath);
    try {
        if (filename && (0, node_fs_1.existsSync)(originalPath)) {
            if ((0, node_fs_1.existsSync)(thumbPath)) {
                const imageFileExist = yield (0, resizeImage_1.imageExist)(thumbPath, widthFromPath, heightFromPath);
                if (imageFileExist) {
                    res.sendFile(imagePath);
                }
                else {
                    yield (0, resizeImage_1.resizeImage)(originalPath, widthFromPath, heightFromPath, thumbPath);
                    res.sendFile(imagePath);
                }
            }
            else {
                yield (0, resizeImage_1.resizeImage)(originalPath, widthFromPath, heightFromPath, thumbPath);
                res.sendFile(imagePath);
            }
        }
        else {
            res.send('Incorrect File Name');
        }
    }
    catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
});
exports.processingImage = processingImage;
