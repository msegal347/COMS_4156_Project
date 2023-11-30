import express from 'express';
import requestController from '../controllers/requestController';

const router = express.Router();

router.post('/', requestController.createRequest);

export default router;
