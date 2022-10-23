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
    const imageURL = path.join('images', filename + '.jpg');

    if (!fs.existsSync(imageURL)) {
      req.query.err = 'Image does not exist';
      next();
    }

    // image name after we finish
    const imageFileName = req.query.finalImageName as string;

    useSharp(imageURL, height, width, imageFileName)
      .then(() => {
        next();
      })
      .catch((err) => {
        res.status(400).end('Error reszie image');
      });
  }
};

async function useSharp(
  imageURL: string,
  width: number,
  height: number,
  imageOut: string
): Promise<void> {
  const outputDir = path.resolve(path.join(__dirname, 'modified'));
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  return new Promise<void>((resolve, reject) => {
    const outPath = path.join(outputDir, imageOut);
    sharp(imageURL)
      .resize(height, width)
      .toFile(outPath, (err, info) => {
        if (err) reject(err);
        resolve();
      });
  });
}
export { imageManipulator, useSharp };
