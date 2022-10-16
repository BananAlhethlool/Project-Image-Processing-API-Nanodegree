import supertest from 'supertest';
import app from "../index"

const request = supertest(app);

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