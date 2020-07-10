// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
// import AppError from '@shared/errors/AppErrors';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
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
  });
});
