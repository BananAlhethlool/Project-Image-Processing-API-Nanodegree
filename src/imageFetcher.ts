import { promises as fs } from 'fs';
import path from 'path';

async function imageFetcher(finalImageName: string): Promise<Buffer> {
  const imagePath = path.join(__dirname, 'modified', finalImageName);
  const imageBitmap = await fs.readFile(imagePath);
  return imageBitmap;
}

export default imageFetcher;
