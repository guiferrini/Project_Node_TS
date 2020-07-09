import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    // só coloco '/', pq já foi definida a rota e exportada
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordServices);

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
