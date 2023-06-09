import Router from 'express';
const router = Router();
import { payme } from '../controllers/transaction.js';

router.post('/', payme);

export default router;
