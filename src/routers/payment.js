import Router from 'express';
const router = Router();
import { Handler } from '../controllers/payment.js';

router.post('/', Handler);

export default router;
