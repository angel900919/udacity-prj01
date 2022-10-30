import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });


});
