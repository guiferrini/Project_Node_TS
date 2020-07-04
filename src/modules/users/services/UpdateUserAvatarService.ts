import path from 'path';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUsersRepositories';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // verificando se user é valido
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401); // 401 - erro o usuario n está autorizado a fazer o q ele esta fazendo
    }

    // deletar avatar anterior
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
