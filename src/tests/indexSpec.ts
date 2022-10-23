import supertest from 'supertest';
import app from "../index"
import { useSharp } from '../imageManipulator';
import path from 'path';

import {SpecReporter} from "jasmine-spec-reporter";

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  })
);

const request = supertest(app);
describe("Image Resizer isolated", (): void => {

  it("Valid Image Resize",  async (): Promise<void> => {
    const corretImageName = "fjord";
    const testImagePath : string =  path.join("images", corretImageName + ".jpg");
    const testWidth  = 150;
    const testHeight  = 560;
    const testoutputImageName =  `${corretImageName}${testHeight}${testWidth}.jpg`;
    await expectAsync(useSharp(testImagePath, testWidth, testHeight, testoutputImageName))
    .not.toBeRejectedWithError();});
    
  
 it("invalid Image Resize", async (): Promise<void> => {
  const badImageName = "Banan";
  const testImagePath : string =  path.join("images", badImageName + ".jpg");
  const testWidth  = -1;
  const testHeight  = 55;
  const testoutputImageName  =  `${badImageName}${testHeight}${testWidth}.jpg`;
  
  await expectAsync(useSharp(testImagePath, testWidth, testHeight, testoutputImageName))
   .toBeRejectedWithError();
});

});

  describe('Test bad image width', (): void => {
        it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
            const response = await request.get(`/image?filename=fjord&height=123&width=ksa`);
            expect(response.status).toEqual(400);
        });
    });
    
    describe('Test with image that does not exisit', (): void => {
      it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
          const response = await request.get(`/image?filename=mynewimage&height=123&width=124`);
          expect(response.status).toEqual(400);
      });
  });

  describe('Test with image that goes well', (): void => {
    it('Response status 200 should be returned ', async (): Promise<void> => {
        const response = await request.get(`/image?filename=fjord&height=50&width=255`);
        expect(response.status).toEqual(200);
    });
});