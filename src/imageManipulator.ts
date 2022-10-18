import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const imageManipulator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.query.err) {
    next();
  } else {
    if (req.query.manipulateImage == 'false') next();

    // User Query
    const userQuery = req.query;

    // User Data
    const filename = userQuery.filename;
    const widthParam: string = req.query.width as string;
    const heightParam: string = req.query.height as string;

    // Use the data
    const width: number = parseInt(widthParam);
    const height: number = parseInt(heightParam);

    // Image name in the file system
    const imageURL = 'src\\images\\' + filename + '.jpg';

    if (!fs.existsSync(imageURL)) {
      req.query.err = 'Image does not exist';
      next();
    }

    // image name after we finish
    const imageFileName = req.query.finalImageName as string;

    const dir = path.resolve(path.join(__dirname, 'modified'));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    sharp(imageURL)
      .resize(width, height)
      .toFile(dir + '\\' + imageFileName, (err, info) => {
        next();
      });
  }
};

export default imageManipulator;
