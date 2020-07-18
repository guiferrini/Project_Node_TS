import 'reflect-metadata';
import { inject, injectable, container } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

// objeto dentro de um Array -> [ {...} {...} {...} ]
type IResponse = Array<{
  hour: number;
  availabla: boolean;
}>;


@injectable()
class ListProviderDayAvaibilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day
  }: IRequest): Promise<IResponse> {
    const appointments = await  this.appointmentsRepository.findAllDayFromProvider({
      provider_id,
      month,
      year,
      day
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        availabla: !hasAppointmentInHour && isAfter(compareDate, currentDate), // o contrario do has..., devolve um boolean
      };
    });

return availability;
};
};
export default ListProviderDayAvaibilityServices;
