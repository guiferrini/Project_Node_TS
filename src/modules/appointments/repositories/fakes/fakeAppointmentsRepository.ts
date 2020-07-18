// Não pode ter nenhuma conexao com o typeorm
// crio Array e utilizo só JS puro para salvar infos e fazer os testes
// o 'fake' é um esplho do repository porem salvando em Array
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmenDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dto/IFindAllMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dto/IFindAllDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllMonthFromProvider({
    provider_id,
    month,
    year }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id ===  provider_id &&
        getMonth(appointment.date) + 1 === month && // começa do zero
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllDayFromProvider({
    provider_id,
    month,
    day,
    year }: IFindAllDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id ===  provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month && // começa do zero
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
    // mesmo resultado do object, uma unica linha
    // appointment.id = uuid();
    // appointment.provider_id = provider_id;
    // appointment.date = date;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
