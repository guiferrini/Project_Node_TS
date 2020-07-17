import 'reflect-metadata';
import { inject, injectable, container } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

// objeto dentro de um Array -> [ {...} {...} {...} ]
type IResponse = Array<{
  day: number;
  availabla: boolean;
}>;


@injectable()
class ListProviderMonthAvaibilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year }: IRequest): Promise<IResponse> {
      const appointments = await this.appointmentsRepository.findAllMonthFromProvider(
        {
          provider_id,
          month,
          year
        },
      );

      const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

      const eachDayArray = Array.from(
        { length: numberOfDaysInMonth },
        (_, index) => index + 1,
      );

      const availability = eachDayArray.map(day => {
        const appointmentsInDay = appointments.filter(appointment => {
          return getDate(appointment.date) === day;
        });

        return {
          day,
          availabla: appointmentsInDay.length < 10,
        };
      });

    return availability;
  }
}
export default ListProviderMonthAvaibilityServices;
