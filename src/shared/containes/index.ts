import { container } from 'tsyringe';

import IAppointmetsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmetsRepositoy from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IAppointmetsRepository>( // a Tipagem garante q 2° parametro esteja no formato correto
  'AppointmetsRepositoy', // id/nome (eu escolho)
  AppointmetsRepositoy, // repositorio q vai usar na injeção
);
