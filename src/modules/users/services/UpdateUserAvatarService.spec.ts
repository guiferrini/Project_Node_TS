// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to create avatar user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatarTest.jpg',
    });

    expect(user.avatar).toBe('avatarTest.jpg');
  });

  it('should not be able to update avatar with not existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-exist-user',
        avatarFilename: 'avatarTest.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update avatar user - delete the older', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // spyOn - espiona/observa uma função - p saber se foi executada ou não
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatarTest.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatarTest2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatarTest.jpg');
    expect(user.avatar).toBe('avatarTest2.jpg');
  });
});
