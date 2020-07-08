// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
// import CreateUserServices from './CreateUsersService';

import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailServices';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the passaword using his email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'gmf@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to a not existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'gmf@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokensRepository();

    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'gmf@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
