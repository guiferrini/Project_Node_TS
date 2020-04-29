import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUsersService';

// validar se usuaria está autenticado
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig); // upload é uma instancia do multer, tenho alguns métodos

usersRouter.post('/', async (request, response) => {
  // só coloco '/', pq já foi definida a rota e exportada
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// patch altera uma unica info
usersRouter.patch(
  '/avatar',
  ensureAuthenticated, // miidleware
  upload.single('avatar'), // miidleware
  async (request, response) => {
    console.log(request.file);

    return response.json({ ok: true });
  },
);

export default usersRouter;
