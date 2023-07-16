import express from 'express';

const imageQueryParamValidate = (
  request: express.Request,
  response: express.Response,
  next: Function,
): void => {
  if (!request.query.filename) {
    response
      .status(400)
      .send(`Image with filename ${request.query.filename} not found`);
  }

  if (!request.query.width) {
    response.status(400).send('Width param not found');
  }

  if (!request.query.height) {
    response.status(400).send('Height param not found');
  }

  let width = parseInt(request.query.width as string);
  let height = parseInt(request.query.height as string);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    response.status(400).send('Width or height value is not a number');
  }

  next();
};

export default imageQueryParamValidate;
