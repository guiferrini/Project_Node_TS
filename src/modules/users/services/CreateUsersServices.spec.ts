// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';
import CreateUserServices from './CreateUsersService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createUser = new CreateUserServices(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with the same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createUser = new CreateUserServices(fakeUsersRepository);

    await createUser.execute({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'gui',
        email: 'gmf@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
