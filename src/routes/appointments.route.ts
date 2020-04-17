import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = []; // P salvar os agendamentos

appointmentsRouter.post('/', (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  const { provider, date } = request.body; // nome do barber e data(dia e hr)

  const parsedDate = startOfHour(parseISO(date)); // zera hora e transforma date em obj js

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
