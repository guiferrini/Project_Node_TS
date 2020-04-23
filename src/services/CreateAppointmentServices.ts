// Serviço responsável somente pela CRIAÇÃO de agendamentos
// SERVICES nunca tem acesso direto aos dados da REQUISIÇÃO e a RESPOSTA, o resposável é ROTA
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked'); // lança o erra a mensagem, é o 'return response'
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // o create n salva no bd
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
