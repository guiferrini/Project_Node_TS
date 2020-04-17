import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = []; // P salvar os agendamentos

appointmentsRouter.post('/', (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  const { provider, date } = request.body; // nome do barber e data(dia e hr)

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
