import Jimp from "jimp";


const resizeImage = async (oldPath:string, newPath:string,width: number, height:number ): Promise<void> => {


    try {
        const image = await Jimp.read(oldPath);
        await image.resize(width,height);
        await image.writeAsync(newPath);
    }
    catch (err){
        console.log(err)
    }


}

export default resizeImage;