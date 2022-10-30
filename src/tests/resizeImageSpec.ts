import { imageExist } from '../utils/resizeImage';

describe('Test Resize Module', () => {
  const widthFromPath = 500;
  const heightFromPath = 900;
  const thumbPath = './assets/thumb/fjord_thumb.jpg';

  it('check if an image does not exist', async () => {
    const imageFileExist = await imageExist(
      thumbPath,
      widthFromPath,
      heightFromPath + 200
    );

    expect(imageFileExist).toEqual(false);
  });

  it('check if an image exist', async () => {
    const imageFileExist = await imageExist(
      thumbPath,
      widthFromPath,
      heightFromPath
    );

    expect(imageFileExist).toEqual(true);
  });
});
