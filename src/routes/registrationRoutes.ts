import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/api/registration', UserController.register);

export default router;
