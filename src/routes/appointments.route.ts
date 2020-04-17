import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
