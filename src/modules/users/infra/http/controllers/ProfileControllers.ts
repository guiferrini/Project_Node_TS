// Controller qdo User já está logado
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileServices from '@modules/users/services/ShowProfileServices';

export default class ProfileController {
  // qdo ele entra p alterar os dados, já mostar os dados atuais
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileServices);

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfike = container.resolve(UpdateProfileService);

    const user = await updateProfike.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete user.password;

    return response.json(user);
  }
}
