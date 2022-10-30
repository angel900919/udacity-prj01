"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images = express_1.default.Router();
const imageProcessing_1 = require("../../utils/imageProcessing");
images.get('/', imageProcessing_1.resizeImage, (req, res) => {
    res.send('ok');
});
exports.default = images;
