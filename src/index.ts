import express from 'express';
import imageHandlerMW from './images';
import queryValidator from './validator';
import imageManipulator from './imageManipulator';
import imageFetcher from './imageFetcher';

const app = express();

const port = 3000;

const imagesMiddleWare = [queryValidator, imageHandlerMW, imageManipulator];
app.get(
  '/image',
  imagesMiddleWare,
  (req: express.Request, res: express.Response) => {
    if (req.query.err) {
      res.writeHead(400);
      res.end(req.query.err);
    } else {
      const finalImageName = req.query.finalImageName as string;

      imageFetcher(finalImageName).then((image) => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(image);
      });
    }
  }
);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
