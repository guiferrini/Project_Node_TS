import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    // só coloco '/', pq já foi definida a rota e exportada
    const user_id = request.user.id; // nome do barber e data(dia e hr)

    const listProviders = container.resolve(ListProvidersServices);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
