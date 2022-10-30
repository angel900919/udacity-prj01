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
const express_1 = __importDefault(require("express"));
const images = express_1.default.Router();
const image_size_1 = __importDefault(require("image-size"));
const fs_1 = require("fs");
const imageProcessing_1 = require("../../utils/imageProcessing");
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
images.get('/', (req, res) => {
    const filename = typeof req.query.filename === 'string' ? req.query.filename : '';
    const thumbPath = `./assets/thumb/${filename}_thumb.jpg`;
    const originalPath = `./assets/full/${filename}.jpg`;
    const width = typeof req.query.width === 'string' ? parseInt(req.query.width) : 0;
    const height = typeof req.query.height === 'string' ? parseInt(req.query.height) : 0;
    const imagePath = path_1.default.join(process.cwd(), thumbPath);
    try {
        if (filename && (0, node_fs_1.existsSync)(originalPath)) {
            (0, fs_1.access)(thumbPath, fs_1.constants.F_OK, (DoesNotExist) => {
                if (!DoesNotExist) {
                    if (width && height) {
                        const image = (0, image_size_1.default)(thumbPath);
                        if (image.height === height && image.width === width) {
                            res.sendFile(imagePath);
                        }
                        else {
                            (() => __awaiter(void 0, void 0, void 0, function* () {
                                yield (0, imageProcessing_1.resizeImage)(originalPath, thumbPath, width, height).then(() => res.sendFile(imagePath));
                            }))();
                        }
                    }
                    else {
                        res.status(404).send('width, height needs to be higher than 0 ');
                    }
                }
                else {
                    (() => __awaiter(void 0, void 0, void 0, function* () {
                        yield (0, imageProcessing_1.resizeImage)(originalPath, thumbPath, width, height).then(() => res.sendFile(imagePath));
                    }))();
                }
            });
        }
        else {
            res.status(404).send('Incorrect File Name');
        }
    }
    catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
});
exports.default = images;
