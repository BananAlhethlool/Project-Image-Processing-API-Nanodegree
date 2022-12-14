import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const imageHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.query.err) {
    next();
  } else {
    // User Query
    const userQuery = req.query;

    // User Data
    const filename = userQuery.filename;
    const widthParam: string = req.query.width as string;
    const heightParam: string = req.query.height as string;

    // Use the data
    const width: number = parseInt(widthParam);
    const height: number = parseInt(heightParam);

    const finalImageName = `${filename}${width}${height}.jpg`;

    req.query.finalImageName = finalImageName;

    fs.stat(path.join(__dirname, 'modified', finalImageName))
      .then(() => {
        req.query.manipulateImage = 'false';
        next();
      })
      .catch(() => {
        next();
      });
  }
};

export default imageHandler;
