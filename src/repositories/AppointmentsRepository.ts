// resposnabilidade da maneira q os dados são armazenados

import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  // Date Transfere Object
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[]; // private: só posso usar nesta class ('local')

  constructor() {
    this.appointments = []; // P salvar os agendamentos
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
