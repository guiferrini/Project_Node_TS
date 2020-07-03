import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // Assinar um tocken, criar um token
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUsersRepositories';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - senha criptografada
    // password - é a senha q tentou fazer login, não criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // ou const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, authConfig.jwt.secret, {
      // 1°Payload (fica dentro do token mas n seguro) 2°Chave secreta 3° configurações do token
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
