// Controller qdo User já está logado
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  // qdo ele entra p alterar os dados, já mostar os dados atuais
  public async show(request: Request, response: Response): Promise<Response> {
    // exibição do perfil
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
