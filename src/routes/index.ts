// Arquivo principal das rotas
// A ROTA: Recebe requisição; Chama outro arquivo p tratar; devolve uma resposta
import { Router } from 'express';
import appointmentsRouter from './appointments.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // td rota '/apointments da pasta appointments usará esta rota

export default routes;
