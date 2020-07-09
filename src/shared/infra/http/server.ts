import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppErrors';
import routes from './routes';

import '@shared/infra/typeorm'; // n tem q importar 'nd', pq ela n exporta 'nd'
import '@shared/container'; // importação injeção de dependencia

const app = express();

app.use(cors());
app.use(express.json());
app.use('/file', express.static(uploadConfig.uploadFolder)); // rota com caminho fixo, q mostra a imagem
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Middlewera p tratativa de erro tem 4 parametros; _ é next porm n vou utiliz
  if (err instanceof AppError) {
    // se o erro for dentro da aplicação, seu conheço
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  // p q eu consiga debugar o error

  // retorna um erro q eu n esperava
  return response.status(500).json({
    statsu: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log(' ✔  Server stared on port 3️⃣ 3️⃣ 3️⃣ 3️⃣');
});
