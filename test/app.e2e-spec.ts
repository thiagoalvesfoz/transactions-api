import { Test, TestingModule } from '@nestjs/testing';
import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get all transactions', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .expect(Array);
  });

  it('create a new transactions', async () => {
    const transaction = { type: 'credit', amount: 45.65 };

    const res = await request(app.getHttpServer())
      .post('/transactions')
      .set('Content-Type', 'application/json')
      .send(transaction)
      .expect(HttpStatus.CREATED);

    expect(res.body).toHaveProperty('id');
  });
});
