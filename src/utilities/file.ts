import { promises as fs } from 'fs';
import path from 'path';
import processImage from './imageProcessing';
import { ImageQuery } from '../model/ImageQuery';

const originalImagesPath = path.resolve(__dirname, '../images/full');
const thumbImagesPath = path.resolve(__dirname, '../images/thumb');

const getImagePath = async (
  imageQueryParam: ImageQuery,
): Promise<null | string> => {
  if (!imageQueryParam.filename) {
    return null;
  }
  const filePath =
    imageQueryParam.width && imageQueryParam.height
      ? path.resolve(
          thumbImagesPath,
          `${imageQueryParam.filename}-${imageQueryParam.width}x${imageQueryParam.height}.jpg`,
        )
      : path.resolve(originalImagesPath, `${imageQueryParam.filename}.jpg`);

  try {
    await fs.access(filePath);
    return filePath;
  } catch {
    return null;
  }
};

const isOriginalImageExist = async (filename: string): Promise<boolean> => {
  if (!filename) {
    return false;
  }
  const filePath = path.resolve(originalImagesPath, `${filename}.jpg`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const isThumbImageExist = async (
  imageQueryParam: ImageQuery,
): Promise<boolean> => {
  if (
    !imageQueryParam.filename ||
    !imageQueryParam.width ||
    !imageQueryParam.height
  ) {
    return false;
  }

  const filePath: string = path.resolve(
    thumbImagesPath,
    `${imageQueryParam.filename}-${imageQueryParam.width}x${imageQueryParam.height}.jpg`,
  );

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const checkThumbFolderExistOrCreateNew = async (): Promise<void> => {
  try {
    await fs.access(thumbImagesPath);
  } catch {
    fs.mkdir(thumbImagesPath);
  }
};

const createThumbImage = async (
  imageQueryParam: ImageQuery,
): Promise<null | string> => {
  if (
    !imageQueryParam.filename ||
    !imageQueryParam.width ||
    !imageQueryParam.height
  ) {
    return null;
  }

  const filePathOriginal: string = path.resolve(
    originalImagesPath,
    `${imageQueryParam.filename}.jpg`,
  );

  const filePathThumb: string = path.resolve(
    thumbImagesPath,
    `${imageQueryParam.filename}-${imageQueryParam.width}x${imageQueryParam.height}.jpg`,
  );

  return await processImage({
    source: filePathOriginal,
    target: filePathThumb,
    width: parseInt(imageQueryParam.width),
    height: parseInt(imageQueryParam.height),
  });
};

export default {
  getImagePath,
  isOriginalImageExist,
  isThumbImageExist,
  checkThumbFolderExistOrCreateNew,
  createThumbImage,
};
