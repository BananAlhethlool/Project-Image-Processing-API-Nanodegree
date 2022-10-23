import express from 'express';

const queryValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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

  if (!isAllDigits(widthParam) || !isAllDigits(heightParam)) {
    req.query.err = 'width or height is invalid';
    next();
  }
  next();
};
function isAllDigits(testString: string): boolean {
  return /^\d+$/.test(testString);
}

export default queryValidator;
