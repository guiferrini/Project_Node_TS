// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to Update the Profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'gui alterado',
      email: 'alterado@test.com.br',
    });

    expect(updateUser.name).toBe('gui alterado');
    expect(updateUser.email).toBe('alterado@test.com.br');
  });

  it('should not be able to change email to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'su',
      email: 'su@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'su',
        email: 'gmf@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to Update the Password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'gui alterado',
      email: 'alterado@test.com.br',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to Update the Password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'gui alterado',
        email: 'alterado@test.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
