import { describe, it, before } from 'mocha';
import { expect } from 'chai';

import { testingDB } from '../../../../../tests/db/setupSequelize';
import { createUserUseCase } from '.';
import { userRepoSeq } from '../../repos';
import { fail } from 'assert';
import { UserFieldError } from '../../../../core/BaseErrors';

describe('Integration Tests: CreateUserUseCase', () => {
  before(async () => {
    await testingDB.cleanedDb();
  });

  it('Should create a new user', async () => {
    const dto = { email: 'francisco@example.com', password: '12345678' };
    const response = await createUserUseCase.execute(dto);
    expect(response.email).eq(dto.email);
    expect(response.hashedPassword).not.eq(dto.password);
    expect(response.uuid).not.equal('');
    expect(response.createdAt).to.be.a('Date');
    expect(response.updatedAt).to.be.a('Date');

    const fetched = await userRepoSeq.findByEmail(dto.email);
    expect(fetched.email).eq(dto.email);
    expect(fetched.hashedPassword).eq(response.hashedPassword);
  });

  it('Should throw error if email is missing', async () => {
    const dto = { email: null, password: '1234123' };
    try {
      await createUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('User email not provided');
    }
  });

  it('Should throw error if password is missing', async () => {
    const dto = { email: 'hello@example.com', password: null };
    try {
      await createUserUseCase.execute(dto);
      fail();
    } catch (err) {
      expect(err).instanceof(UserFieldError);
      expect(err.message).eq('User password not provided');
    }
  });
});
