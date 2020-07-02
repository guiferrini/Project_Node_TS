// verifica se o usuario esta autenticado na aplicação
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppErrors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT
  // pegar ele de dentro da requisição, ele vaio pelo cabeçalho/header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWt token is missing', 401);
  }

  // se o token existir vou dividir 'Bearer' do 'número e verificar  se é válido
  // o bearer, 1° elemento eu n vou usar -> espaço e virgula
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; // forçando um tipo de variável, pq o sistem an sabe se é string ou objeto

    // Request modificado em @types -> express.d.ts
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
