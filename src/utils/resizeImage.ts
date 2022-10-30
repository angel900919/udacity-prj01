import sharp from 'sharp';


const resizeImage = async (
  file: string,
  width: number,
  height: number,
  destinationPath: string
): Promise<void> => {
  const imageOriginal = sharp(file);
  await imageOriginal
    .resize({ width: width, height: height })
    .toFile(destinationPath);
};

const imageExist = async (
  path: string,
  width: number,
  height: number
): Promise<boolean> => {
  const image = sharp(path);
  const metadata = await image.metadata();

  if (width === metadata.width && height === metadata.height) {
    return true;
  } else {
    return false;
  }
};

export { resizeImage, imageExist };
