import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppErrors';
// import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepositories';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordRmailServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedirod de recuperação de email recebbido',
    );
  }
}

export default SendForgotPasswordRmailServices;
