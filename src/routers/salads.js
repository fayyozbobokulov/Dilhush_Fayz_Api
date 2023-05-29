import Router from 'express';
const router = Router();
import {
	getSalad,
	getByIdSalad,
	postSalad,
	updateSalad,
	deletedSalad,
} from '../controllers/salads.js';

router.post('/', postSalad);
router.put('/update/:id', updateSalad);
router.get('/', getSalad);
router.get('/:id', getByIdSalad);
router.delete('/delete/:id', deletedSalad);

export default router;
