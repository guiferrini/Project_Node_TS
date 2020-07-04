import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

// validar se usuaria está autenticado
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig); // upload é uma instancia do multer, tenho alguns métodos
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

// patch altera uma unica info
usersRouter.patch(
  '/avatar',
  ensureAuthenticated, // miidleware
  upload.single('avatar'), // miidleware
  userAvatarController.update,
);

export default usersRouter;
