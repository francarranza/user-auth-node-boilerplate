import { describe, it, before } from 'mocha';
import { expect } from 'chai';

import { testingDB } from '../../../../../tests/db/setupSequelize';
import { fail } from 'assert';
import { UserFieldError } from '../../../../core/BaseErrors';
import { createUserUseCase } from '../createUser';
import { loginUserUseCase } from '.';

describe('Integration Tests: LoginUser Use Case', () => {
  const create = { email: 'francisco@example.com', password: '123141241' };

  before(async () => {
    await testingDB.cleanedDb();
    await createUserUseCase.execute(create);
  });

  it('Should login user', async () => {
    const credentials = create;
    const res = await loginUserUseCase.execute(credentials);

    expect(res.jwt).not.eq('');
    expect(res.jwt).to.be.a('string');
    expect(res.user.email).eq(credentials.email);
    expect(res.user).not.haveOwnProperty('password');
    expect(res.user).not.haveOwnProperty('hashedPassword');
  });

  it('Should throw error if email is missing', async () => {
    const dto = { email: null, password: create.password };
    try {
      await loginUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('Email not provided');
    }
  });

  it('Should throw error if password is missing', async () => {
    const dto = { email: create.email, password: null };
    try {
      await loginUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('Password not provided');
    }
  });

  it('Should throw error if password is invalid', async () => {
    const dto = { ...create, password: 'invalid' };
    try {
      await loginUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('Invalid credentials');
    }
  });

  it('Should throw error if user does not exist', async () => {
    const dto = { email: 'not_exist@example.com', password: 'pass123123' };
    try {
      await loginUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('User not found');
    }
  });
});
