import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'; // parseISO: trans o dado de string p data

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();

  return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  try {
    const { provider_id, date } = request.body; // nome do barber e data(dia e hr)

    // const parsedDate = startOfHour(parseISO(date)); // zera hora e transforma date em obj js
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
