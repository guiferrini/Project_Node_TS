import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppErrors';
// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepositories';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordRmailServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<void> {}
}

export default SendForgotPasswordRmailServices;
