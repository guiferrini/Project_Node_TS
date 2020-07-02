// I = Interface
// Responsabilidade de retornar interface do Appointment repositories
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
