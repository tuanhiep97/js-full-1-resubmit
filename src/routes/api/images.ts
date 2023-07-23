import express from 'express';
import file from './../../utilities/file';
import imageQueryParamValidate from '../../utilities/validateRequest';

const images: express.Router = express.Router();

images.get(
  '/',
  imageQueryParamValidate,
  async (
    request: express.Request,
    response: express.Response,
  ): Promise<void> => {
    let error: null | string = '';

    if (Object.keys(request.query).length === 0) {
      response.send('<h1>Web processing API</h1>');
      return;
    }

    if (!(await file.isThumbImageExist(request.query))) {
      error = await file.createThumbImage(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path: null | string = await file.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('Cannot generate path');
    }
  },
);

export default images;
