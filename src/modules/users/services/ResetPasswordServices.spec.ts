// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordServices from './ResetPasswordServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordServices;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordServices', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordServices(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('Should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-extist',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-exist-user');

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passaed more than 2 hours', async () => {
    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
