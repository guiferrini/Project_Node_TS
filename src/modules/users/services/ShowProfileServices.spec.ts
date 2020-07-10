// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import ShowProfileService from './ShowProfileServices';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the Profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gui',
      email: 'gmf@teste.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('gui');
    expect(profile.email).toBe('gmf@teste.com');
  });

  it('should not be able to show the Profile from not exist user', async () => {
    expect(
      showProfile.execute({
        user_id: 'not exist user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
