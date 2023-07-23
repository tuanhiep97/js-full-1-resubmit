import express from 'express';

const imageQueryParamValidate = (
  request: express.Request,
  response: express.Response,
  next: Function,
): void => {
  if (request.query.width) {
    const width = parseInt(request.query.width as string);
    if (Number.isNaN(width) || width < 1) {
      response.status(400).send('Width param must be a positive number');
    }
  }

  if (request.query.height) {
    const height = parseInt(request.query.height as string);
    if (Number.isNaN(height) || height < 1) {
      response.status(400).send('Height param must be a positive number');
    }
  }

  next();
};

export default imageQueryParamValidate;
