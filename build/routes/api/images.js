"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images = express_1.default.Router();
const processingImage_1 = require("../../utils/processingImage");
images.get('/', processingImage_1.processingImage, (req, res) => {
    res.send('ok');
});
exports.default = images;
