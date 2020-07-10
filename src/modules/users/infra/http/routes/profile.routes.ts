import { Router } from 'express';

import ProfileController from '../controllers/ProfileControllers';

// validar se usuaria está autenticado
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// Tds rotas de perfil necessitam q usuario esteja logado! e
// td user logado tem acesso ao user_id
profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);

export default profileRouter;
