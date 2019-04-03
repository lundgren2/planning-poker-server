import { expect } from 'chai';
import * as api from './api';
import * as error from '../graphql/messages';

const testUser = {
  email: 'test@test.se',
  password: 'test',
  name: 'Test Testsson',
};

describe('type Auth:', () => {
  it('invalid email and password', async () => {
    const result = await api.signup({ email: '', password: '', name: '' });
    const { data, errors } = result.data;

    expect(data).to.be.a('null');
    expect(errors[0].message).to.include(error.signup.invalidEmailPassword);
  });

  it('invalid password', async () => {
    const result = await api.signup({
      email: testUser.email,
      password: '',
      name: '',
    });
    const { data, errors } = result.data;

    expect(data).to.be.a('null');
    expect(errors[0].message).to.include(error.signup.invalidEmailPassword);
  });

  it('signup success', async () => {
    const result = await api.signup({
      email: testUser.email,
      password: testUser.password,
      name: testUser.name,
    });
    const { data } = result.data;

    expect(data.signup.user.email).to.eql(testUser.email);
    expect(data.signup.token).to.be.a('string');
  });
});
