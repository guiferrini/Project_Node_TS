import { Router } from 'express';
import { parseISO } from 'date-fns'; // parseISO: trans o dado de string p data

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// tds as rotas necessitam da autenticação, aplica p tds!
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointment = await appointmentsRepository.find();

//   return response.json(appointment);
// });

appointmentsRouter.post('/', async (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  const { provider_id, date } = request.body; // nome do barber e data(dia e hr)

  // const parsedDate = startOfHour(parseISO(date)); // zera hora e transforma date em obj js
  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
