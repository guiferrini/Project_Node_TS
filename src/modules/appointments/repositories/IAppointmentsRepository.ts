// I = Interface
// Responsabilidade de retornar interface do Appointment repositories
// Quais metodos existem no nosso Repository
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dto/ICreateAppointmenDTO';
import IFindAllMonthFromProvider from '../dto/IFindAllMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllMonthFromProvider(date: IFindAllMonthFromProvider): Promise<Appointment[]>;
}
