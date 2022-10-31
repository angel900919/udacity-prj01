import { imageExist, resizeImage } from '../utils/resizeImage';

describe('Test Resize Module', () => {
  const width = 500;
  const height = 900;
  const thumbPath = './assets/thumb/fjord_thumb.jpg';
  const originalPath = './assets/full/encenadaport.jpg';

  it('check if an image does not exist', async () => {
    const imageFileExist = await imageExist(thumbPath, width, height + 200);

    expect(imageFileExist).toEqual(false);
  });


  it('check if the image is Processed without errors',  () => {
    expect(async () => {
      await resizeImage(originalPath, width, height, thumbPath);
    }).not.toThrow();
  });
});
