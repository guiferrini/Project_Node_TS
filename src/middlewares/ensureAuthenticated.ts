// verifica se o usuario esta autenticado na aplicação
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT
  // pegar ele de dentro da requisição, ele vaio pelo cabeçalho/header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWt token is missing');
  }

  // se o token existir vou dividir 'Bearer' do 'número e verificar  se é válido
  // o bearer, 1° elemento eu n vou usar -> espaço e virgula
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded);

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
