import sharp from 'sharp';


const resizeImage = async (file: string, width:number, height:number, destinationPath: string):Promise<void> => {

    const imageOriginal = sharp(file);
    await imageOriginal
        .resize({ width: width, height: height })
        .toFile(destinationPath)

}

const imageExist = (path:string) => {

}


export {resizeImage};