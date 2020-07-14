import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // verificando se usuario existe
    const users = await this.usersRepository.findAllProviders(user_id); // metodo: retorna tds menos quem está usando a aplicação

    return users;
  }
}
export default ListProvidersService;
