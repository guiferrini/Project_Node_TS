import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUsersRepositories';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    // verificando se usuario existe
    const user = await this.usersRepository.findById(user_id); // ojeto inteiro do user q esta sendo atualizado

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
export default ShowProfileServices;
