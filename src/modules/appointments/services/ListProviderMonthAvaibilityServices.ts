import 'reflect-metadata';
import { inject, injectable, container } from 'tsyringe';

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

      console.log(appointments);

    return [{ day: 1, availabla: false }]
  }
}
export default ListProviderMonthAvaibilityServices;
