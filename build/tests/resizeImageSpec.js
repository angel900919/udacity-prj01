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
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImage_1 = require("../utils/resizeImage");
describe('Test Resize Module', () => {
    const width = 500;
    const height = 900;
    const thumbPath = './assets/thumb/fjord_thumb.jpg';
    const originalPath = './assets/full/encenadaport.jpg';
    it('check if an image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageFileExist = yield (0, resizeImage_1.imageExist)(thumbPath, width, height + 200);
        expect(imageFileExist).toEqual(false);
    }));
    it('check if the image is Processed without errors', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, resizeImage_1.resizeImage)(originalPath, width, height, thumbPath);
        })).not.toThrow();
    });
});
