import express from 'express';

const queryValidator = (
  req: express.Request,
  res: express.Response,
  next: Next
): void => {
  const userQuery = req.query;
  if (
    userQuery.filename == undefined ||
    userQuery.width == undefined ||
    userQuery.height == undefined
  ) {
    res.end('Missing data');
  }
  const widthParam: string = req.query.width as string;
  const heightParam: string = req.query.height as string;
  const width: number = parseInt(widthParam);
  const height: number = parseInt(heightParam);

  if (isNaN(width) || isNaN(height)) {
    req.query.err = 'width or height is invalid';
    next();
  }
  next();
};

export default queryValidator;
