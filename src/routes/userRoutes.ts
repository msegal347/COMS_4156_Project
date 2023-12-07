import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/current', UserController.getCurrentUser);
router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);

export default router;
