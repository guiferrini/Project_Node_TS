// Arquivo principal das rotas
// A ROTA: Recebe requisição; Chama outro arquivo p tratar; devolve uma resposta
import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // td rota '/apointments da pasta appointments usará esta rota
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;