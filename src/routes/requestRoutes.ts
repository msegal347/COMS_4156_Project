import express from 'express';
import requestController from '../controllers/requestController';
import authenticate from '../middleware/authenticate'; 

const router = express.Router();

router.post('/', authenticate, requestController.createRequest);

export default router;
