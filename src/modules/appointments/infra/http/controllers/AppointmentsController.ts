import { Request, Response } from 'express';
import { parseISO } from 'date-fns'; // parseISO: trans o dado de string p data
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // só coloco '/', pq já foi definida a rota e exportada
    const { provider_id, date } = request.body; // nome do barber e data(dia e hr)

    // const parsedDate = startOfHour(parseISO(date)); // zera hora e transforma date em obj js
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
