import sharp from 'sharp';
import { SharpResizeParams } from '../model/SharpResizeParams';

const processImage = async (
  params: SharpResizeParams,
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Image could not be processed.';
  }
};

export default processImage;
