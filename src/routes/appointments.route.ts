import { Router } from 'express';
import { parseISO } from 'date-fns'; // parseISO: trans o dado de string p data

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentsRepository.all();

  return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  try {
    const { provider, date } = request.body; // nome do barber e data(dia e hr)

    // const parsedDate = startOfHour(parseISO(date)); // zera hora e transforma date em obj js
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
