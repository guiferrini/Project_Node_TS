import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // Assinar um tocken, criar um token
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    // user.password - senha criptografada
    // password - é a senha q tentou fazer login, não criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
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
