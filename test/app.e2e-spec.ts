import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    );
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

  it('must not create an invalid transaction', async () => {
    const transaction = { type: 'AAA', amount: '-12' };

    const res = await request(app.getHttpServer())
      .post('/transactions')
      .set('Content-Type', 'application/json')
      .send(transaction)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    const { message } = res.body;

    [
      'type must be one of the following values: credit, debit',
      'amount must be a number conforming to the specified constraints',
      'amount must not be less than 0.01',
    ].forEach((expected) => {
      expect(message).toContain(expected);
    });
  });
});
