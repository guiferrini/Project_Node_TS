import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailServices from '@modules/users/services/SendForgotPasswordEmailServices';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    // só coloco '/', pq já foi definida a rota e exportada
    const { email } = request.body;

    const sendForgotPasswordEmailServices = container.resolve(
      SendForgotPasswordEmailServices,
    );

    await sendForgotPasswordEmailServices.execute({
      email,
    });

    return response.status(204).json();
  }
}
