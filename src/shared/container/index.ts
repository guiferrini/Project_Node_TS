import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmetsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmetsRepositoy from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

container.registerSingleton<IAppointmetsRepository>( // a Tipagem garante q 2° parametro esteja no formato correto
  'AppointmetsRepositoy', // id/nome (eu escolho)
  AppointmetsRepositoy, // repositorio q vai usar na injeção
);

container.registerSingleton<IUsersRepository>( // a Tipagem garante q 2° parametro esteja no formato correto
  'UsersRepository', // id/nome (eu escolho)
  UsersRepository, // repositorio q vai usar na injeção
);
