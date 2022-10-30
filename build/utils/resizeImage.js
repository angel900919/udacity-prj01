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
exports.imageExist = exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (file, width, height, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    const imageOriginal = (0, sharp_1.default)(file);
    yield imageOriginal
        .resize({ width: width, height: height })
        .toFile(destinationPath);
});
exports.resizeImage = resizeImage;
const imageExist = (path, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const image = (0, sharp_1.default)(path);
    const metadata = yield image.metadata();
    if (width === metadata.width && height === metadata.height) {
        return true;
    }
    else {
        return false;
    }
});
exports.imageExist = imageExist;
