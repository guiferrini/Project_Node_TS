// Repositorios de Appointments especifico p o typeorm, se trocar BD, altera aqui

// resposnabilidade da maneira q os dados são armazenados
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmenDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dto/IFindAllMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dto/IFindAllDayFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment); // Cria o repositorio de Appointments
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllMonthFromProvider({
    provider_id,
    month,
    year }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
      const parseMonth = String(month).padStart(2, '0'); //se começa com 1, transforma em 01

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(
            dateFilename =>
              `to_char(${dateFilename}, 'MM-YYYY') = '${parseMonth}-${year}'`,
          ),
        },
      });

    return appointments;
  }

  public async findAllDayFromProvider({
    provider_id,
    month,
    day,
    year }: IFindAllDayFromProviderDTO): Promise<Appointment[]> {
      const parseMonth = String(month).padStart(2, '0'); //se começa com 1, transforma em 01
      const parseDay = String(day).padStart(2, '0'); //se começa com 1, transforma em 01

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(
            dateFilename =>
              `to_char(${dateFilename}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`,
          ),
        },
      });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date, user_id });

    // o create n salva no bd
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
