// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
// import AppError from '@shared/errors/AppErrors';
import AuthenticateUserServices from './AuthenticateUserService';
import CreateUsersServices from './CreateUsersService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createUser = new CreateUsersServices(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserServices(fakeUsersRepository);

    // 1° cio User e depois Authentico
    await createUser.execute({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'gmf@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
