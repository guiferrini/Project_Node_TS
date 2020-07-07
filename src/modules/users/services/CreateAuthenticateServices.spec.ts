// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';
import AuthenticateUserServices from './AuthenticateUserService';
import CreateUsersServices from './CreateUsersService';

import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createUser = new CreateUsersServices(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHashProvider,
    );

    // 1° cio User e depois Authentico
    const user = await createUser.execute({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'gmf@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const authenticateUser = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'gmf@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createUser = new CreateUsersServices(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHashProvider,
    );

    // 1° cio User e depois Authentico
    await createUser.execute({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'gmf@gmail.com',
        password: 'wrong-passrod',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
