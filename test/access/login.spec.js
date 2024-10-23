/* eslint-disable no-undef */
import AccessService from '#~/api/v1/services/access.service.js';
import db from '#~/config/mongoDB.js';
import mongoose from 'mongoose';

describe('Access testcases', () => {
  const email = 'testaccount@gmail.com';
  const password = '123';

  beforeAll(async () => {
    await db.connect();
  });
  afterAll(async () => {
    await AccessService.delete({ email });
    await mongoose.connection.close();
  });

  test('sign up successflly', async () => {
    const expected = await AccessService.signup({ email, password });

    expect(expected).toBeTruthy();
  });

  test('login successflly', async () => {
    const expected = await AccessService.login({ email, password });

    expect(expected).toBeTruthy();
  });
});
