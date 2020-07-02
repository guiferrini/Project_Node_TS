// Serviço responsável somente pela CRIAÇÃO de agendamentos
// SERVICES nunca tem acesso direto aos dados da REQUISIÇÃO e a RESPOSTA, o resposável é ROTA
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';

import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked'); // lança o erra a mensagem, é o 'return response'
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
