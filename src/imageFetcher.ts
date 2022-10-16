import { promises as fs } from 'fs';

async function imageFetcher(finalImageName: string): Promise<Buffer> {
  const imagePath = __dirname + '\\modified\\' + finalImageName;
  const imageBitmap = await fs.readFile(imagePath);
  return imageBitmap;
}

export default imageFetcher;
